import firebase from './firebase';
import Swal from 'sweetalert2';


export const stringGenerate = () => {
  return Math.random().toString(36).substring(2);
}

export const uploadToFirebase = async ({ file, fileName, folderUrl }) => {
  try {
    await firebase.storage().ref(folderUrl).child(fileName).put(file);
    return await firebase.storage().ref(folderUrl).child(fileName).getDownloadURL();
  } catch (error) {
    console.log(error);
    return null;
  }
}

export const removeToFirebase = async ({ fileName, folderUrl }) => {
  try {
    await firebase.storage().ref(folderUrl).child(fileName).delete();
    return true;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export const alertMessage = ({ type = 'success', message }) => {
  const Toast = Swal.mixin({ toast: true });
  return Toast.fire({
    position: 'top-right',
    width: 400,
    icon: type,
    title: message,
    showConfirmButton: false,
    timer: 2000
  });
}