import { InfomationUser } from "@/components/constants/select-options";
import { dbg, myFirebase } from "@/firebase";
import { Images } from "@/images";
import {
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { StaticImageData } from "next/image";

export const useSaveUserNameToServer = async (
  userName: string,
  name: string,
  photoURL: string | StaticImageData
) => {
  const docRef = doc(dbg, "usersname", "users list");
  const getRef = await getDoc(docRef);
  if (getRef.exists()) {
    await updateDoc(docRef, {
      username: myFirebase.firestore.FieldValue.arrayUnion({
        userName,
        name,
        photoURL,
      }),
    });
  } else {
    setDoc(
      docRef,
      {
        username: [{ userName, name, photoURL }],
      },
      { merge: true }
    );
  }
};

export const useUpdateLastSeen = async (uid: string) => {
  updateDoc(doc(dbg, "users", uid), {
    lastSeen: serverTimestamp(),
  });
};

export const useGetUserNameList = async () => {
  const docRef = await getDoc(doc(dbg, "usersname", "users list"));
  if (docRef.exists()) {
    const usersArray = docRef.data()?.username; // lấy mảng users
    return usersArray;
  } else {
    return null;
  }
};

export const useCheckUser = async (uid: string) => {
  const docRef = await getDoc(doc(dbg, "users", uid));
  if (docRef.exists()) {
    return false;
  } else {
    return true;
  }
};

export const useSaveInfomationUser = async (
  uid: string,
  displayName: string,
  email: string,
  photoURL: string | StaticImageData
) => {
  const docRef = doc(dbg, "users", uid);
  const getRef = await getDoc(docRef);
  if (!getRef.exists()) {
    const username = await useCreateUserName();
    await setDoc(
      docRef,
      {
        name: displayName,
        email: email,
        photoURL: photoURL ? photoURL : Images.user,
        userName: username,
        lastSeen: serverTimestamp(),
      },
      { merge: true }
    );
    await useSaveUserNameToServer(username, displayName, photoURL);
  }
};

export const useCreateUserName = async () => {
  let number = 1;
  const currentDate = new Date();
  let day = currentDate.getDate().toString();
  let month = (currentDate.getMonth() + 1).toString();
  month = +month < 10 ? 0 + month : month;
  day = +day < 10 ? 0 + day : day;

  const docRef = doc(dbg, "usersname", "users number");
  const numberRef = await getDoc(docRef);
  const listRef = await getDoc(doc(dbg, "usersname", "users list"));
  if (numberRef.exists()) {
    number = numberRef.data()?.usernumber + 1;
    await updateDoc(docRef, {
      usernumber: number,
    });
  } else {
    await setDoc(docRef, {
      usernumber: 1,
    });
  }
  let username = `user_${day}${month}${number}`;
  if (listRef.exists()) {
    const usersArray: string[] = listRef.data()?.username;
    while (usersArray.includes(username)) {
      const index = username.match(/\d+$/);
      if (index) {
        const newIndex = parseInt(index[0], 10) + 1;
        username = username.replace(/\d+$/, newIndex.toString());
      }
    }
  }
  return username;
};

export const useGetInfomationUser = async (uid: string) => {
  const docRef = await getDoc(doc(dbg, "users", uid));
  if (docRef.exists()) {
    return docRef.data() as InfomationUser;
  } else {
    return null;
  }
};
