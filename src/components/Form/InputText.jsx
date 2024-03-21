function InputText(label, ...props) {
  return (
    <div className="flex flex-col gap-y-2">
      <label htmlFor={label}>{label}</label>
      <input
        type="text"
        className="rounded-md text-primary bg-white py-1.5 px-3 outline-none"
        {...props}
      />
    </div>
  );
}

export default InputText;
