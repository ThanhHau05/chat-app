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

export const useSaveUserNameToServer = async (userName: string) => {
  const docRef = doc(dbg, "usersName", "usersName list");
  const getRef = await getDoc(docRef);
  if (getRef.exists()) {
    await updateDoc(docRef, {
      usersname: myFirebase.firestore.FieldValue.arrayUnion(userName),
    });
  } else {
    setDoc(
      docRef,
      {
        usersname: [userName],
      },
      { merge: true }
    );
  }
};

export const useAddConVersation = async (
  email: string,
  recipientEmail: string
) => {
  const docRef = doc(dbg, "conversations", email);
  const getRef = await getDoc(docRef);
  if (
    getRef.exists() &&
    !(getRef.data().users as string[]).includes(recipientEmail)
  ) {
    updateDoc(docRef, {
      users: [...getRef.data().users, recipientEmail],
    });
  } else if (!getRef.exists()) {
    await setDoc(docRef, {
      users: [recipientEmail],
    });
  }
};

export const useGetUsersConversations = async (email: string) => {
  const docRef = await getDoc(doc(dbg, "conversations", email));
  if (docRef.exists()) {
    const usersArray = docRef.data()?.users;
    return usersArray;
  } else {
    return null;
  }
};

export const useUpdateLastSeen = async (uid: string) => {
  await updateDoc(doc(dbg, "users", uid), {
    lastSeen: serverTimestamp(),
  });
};

export const useGetUserNameList = async () => {
  const docRef = await getDoc(doc(dbg, "usersName", "usersName list"));
  if (docRef.exists()) {
    const usersArray = docRef.data()?.usersname;
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
    const { username, id } = await useCreateUserNameAndID();
    await setDoc(
      docRef,
      {
        id: id,
        name: displayName,
        email: email,
        photoURL: photoURL ? photoURL : Images.user,
        userName: username,
        lastSeen: serverTimestamp(),
      },
      { merge: true }
    );
    await useSaveUserNameToServer(username);
  }
};

export const useCreateUserNameAndID = async () => {
  let number = 1;
  const currentDate = new Date();
  let day = currentDate.getDate().toString();
  let month = (currentDate.getMonth() + 1).toString();
  month = +month < 10 ? 0 + month : month;
  day = +day < 10 ? 0 + day : day;

  const docRef = doc(dbg, "usersName", "users number");
  const numberRef = await getDoc(docRef);
  const listRef = await getDoc(doc(dbg, "usersName", "usersName list"));
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
  const id = `${day}${month}${number}`;
  if (listRef.exists()) {
    const usersArray: string[] = listRef.data()?.usersname;
    while (usersArray.includes(username)) {
      const index = username.match(/\d+$/);
      if (index) {
        const newIndex = parseInt(index[0], 10) + 1;
        username = username.replace(/\d+$/, newIndex.toString());
      }
    }
  }
  return { username, id };
};

export const useGetInfomationUser = async (uid: string) => {
  const docRef = await getDoc(doc(dbg, "users", uid));
  if (docRef.exists()) {
    return docRef.data() as InfomationUser;
  } else {
    return null;
  }
};
