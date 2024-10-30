const InputField = ({ label, type, value, onChange }) => (
    <div className="mb-9 mt-8 w-[467px] sm:w-[300px] bg-transparent rounded-[10px] lg:mb-[47px] lg:h-[30px]">
        <label className="block text-white text-[15px] lg:text-[13px] mb-2 border-none font-inter font-bold">{label}</label>
        <input
            type={type}
            value={value}
            onChange={onChange}
            className="w-full bg-[#222222] text-white border-none py-3 lg:py-2 px-4 focus:outline-none rounded-[10px]"
            placeholder={label}
        />
    </div>
);

export default InputField;