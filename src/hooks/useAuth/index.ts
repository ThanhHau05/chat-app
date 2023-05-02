import { InfomationUser } from "@/components/constants/select-options";
import { db, myFirebase } from "@/firebase";
import { Images } from "@/images";

export const useSaveUserNameToServer = async (
  userName: string,
  name: string,
  photoURL: string
) => {
  const docRef = db.collection("user name").doc("username list");
  await docRef.get().then(async (doc) => {
    if (doc.exists) {
      await docRef.update({
        username: myFirebase.firestore.FieldValue.arrayUnion({
          userName,
          name,
          photoURL,
        }),
      });
    } else {
      await docRef.set({ username: [{ userName, name, photoURL }] });
    }
  });
};

export const useGetUserNameList = async () => {
  const docRef = db.collection("user name").doc("username list");
  await docRef.get().then(async (doc) => {
    if (doc.exists) {
      const usersArray = doc.data()?.username; // lấy mảng users
      return usersArray;
    } else {
      return null;
    }
  });
};

export const useSaveInfomationUser = async (
  uid: string,
  displayName: string,
  email: string,
  photoURL: string
) => {
  const docRef = db.collection("information users").doc(uid);
  await docRef.get().then(async (doc) => {
    if (!doc.exists) {
      const username = await useCreateUserName();
      useSaveUserNameToServer(username, displayName, photoURL);
      docRef.set({
        name: displayName,
        email: email,
        photoURL: photoURL ? photoURL : Images.user,
        userName: username,
      });
    }
  });
};

export const useCreateUserName = async () => {
  const docRef = db.collection("user name").doc("username list");
  const numberRef = db.collection("user name").doc("user number");
  const currentDate = new Date();
  const day = currentDate.getDate();
  let month = (currentDate.getMonth() + 1).toString();
  month = +month < 10 ? "0" + month : month;
  let number = 0;

  await numberRef.get().then(async (doc) => {
    if (doc.exists) {
      number = doc.data()?.usernumber + 1;
      numberRef.update({ usernumber: number });
    } else {
      numberRef.set({ usernumber: 1 });
    }
  });
  let username = `user_${day}${month}${number}`;
  await docRef.get().then(async (doc) => {
    if (doc.exists) {
      const usersArray: string[] = doc.data()?.username;
      while (usersArray.includes(username)) {
        const index = username.match(/\d+$/);
        if (index) {
          const newIndex = parseInt(index[0], 10) + 1;
          username = username.replace(/\d+$/, newIndex.toString());
        }
      }
    }
  });
  return username;
};

export const useGetInfomationUser = async (uid: string) => {
  const docRef = db.collection("information users").doc(uid);
  const value = await docRef.get().then(async (doc) => {
    if (doc.exists) {
      return doc.data() as InfomationUser;
    } else {
      return null;
    }
  });
  return value;
};

// const usersCollection = collection(db, "user name");
// docRef.update({
//   username: firebase.firestore.FieldValue.arrayUnion(userName),
// });
// docRef.set({ username: [userName] });
// docRef.get().then((doc) => {
//   console.log("🚀 ~ file: index.ts:41 ~ docRef.get ~ doc:", doc);
//   if (doc.exists) {
//     const usersArray = doc.data()?.username; // lấy mảng users
//     console.log(usersArray); // ["user1", "user2"]
//   } else {
//     console.log("No such document!");
//   }
// });
// const newDocumentRef = await updateDoc(usersCollection, { username: userName });
