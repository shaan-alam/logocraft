import axios from "axios";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";

import { storage } from "@/utils/firebase";

export const uploadImageToFirebase = async (
  url: string,
  userId: string | undefined,
  filename: string
): Promise<string> => {
  try {
    const response = await axios.get(url, { responseType: "arraybuffer" });
    const imageBlob = new Blob([response.data]);

    const storageRef = ref(storage, `images/${userId}/${filename}-${v4()}.png`);

    await uploadBytes(storageRef, imageBlob);

    const downloadUrl = await getDownloadURL(storageRef);

    return downloadUrl;
  } catch (error) {
    console.error("Error uploading image:", error);
    throw error;
  }
};
