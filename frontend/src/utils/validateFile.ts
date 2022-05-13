
const validateFile = (files: any) => {
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    console.log(validTypes.indexOf(files) === -1);
    if (validTypes.indexOf(files) === -1) {
      return false;
    }
    return true;
}




export default validateFile;