function permute(str, prefix = "") {
  if (str.length === 0) {
    console.log(prefix);
    return;
  }
  for (let i = 0; i < str.length; i++) {
    permute(str.slice(0, i) + str.slice(i + 1), prefix + str[i]);
  }
}

permute("abc");
