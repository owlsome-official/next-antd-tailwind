export const Copy = async (text) => {
  if ("clipboard" in navigator) {
    return await navigator.clipboard.writeText(text);
  } else {
    console.log("Your browser isn't support copy function");
    return;
  }
};
