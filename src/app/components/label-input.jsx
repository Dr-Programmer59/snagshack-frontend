
const InputFieldLabel = ({ label, type, value, onChange, icon }) => (
    <div className="mb-6 w-full min-w-[400px] md:min-w-[300px] max-w-[467px] bg-transparent">
        <label className="block text-white text-[15px] mb-2 font-inter font-bold">{label}</label>
        <div className="relative">
            <input
                type={type}
                value={value}
                onChange={onChange}
                className="w-full bg-[#222222] text-white border-none py-3 pl-12 pr-4 focus:outline-none rounded-[10px] h-[54px]"
                placeholder={label}
            />
            <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                {icon}
            </div>
        </div>
    </div>
);

export default InputFieldLabel;