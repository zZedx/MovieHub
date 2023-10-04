const FlagEmoji = ({ children = ""}) => {
  console.log(children)
  var countryCode = Array.from(children, (codeUnit) => codeUnit.codePointAt())
    .map((char) => String.fromCharCode(char - 127397).toLowerCase())
    .join("");
  return (
    <img src={`https://flagcdn.com/24x18/${countryCode}.png`} alt="" />
  );
};

export default FlagEmoji;
