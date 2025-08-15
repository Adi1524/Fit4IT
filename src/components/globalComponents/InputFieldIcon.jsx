const InputFieldIcon = ({ icon, ...props }) => {
  return (
    <div className="flex items-center border rounded-full px-3 py-1 w-full">
      <input
        type="text"
        className="outline-none border-none w-full bg-transparent placeholder:text-sm"
        {...props}
      />
      {icon}
    </div>
  );
};

export default InputFieldIcon;
