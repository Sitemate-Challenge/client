interface IInputWrapperProps {
	label?: string;
	error?: string;
}

const InputWrapper = ({ label, error, children }) => (
	<div className='w-full flex flex-col gap-y-2'>
		<label htmlFor=''>{label}</label>
		{children}
		{error ? <span className='text-sm text-red-300'>{error}</span> : <></>}
	</div>
);

export default InputWrapper;
