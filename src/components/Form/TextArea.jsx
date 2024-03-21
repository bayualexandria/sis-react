function TextArea(label, ...props) {
  return (
    <div className="flex flex-col gap-y-3">
      <label htmlFor={label}>{label}</label>
      <textarea
        rows="3"
        {...props}
        className="text-primary bg-white rounded-md p-3"
      ></textarea>
    </div>
  );
}

export default TextArea;
