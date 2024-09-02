interface ISearchProps {
	query: string;
	setQuery: (val: string) => void;
	clearQuery: () => void;
}

const Search = ({ query, setQuery, clearQuery }: ISearchProps) => {
	return (
		<div className='flex flex-row items-between w-full gap-x-2 p-4 rounded-lg border focus:border-cyan-200'>
			<img className='w-4 cursor-pointer' src='/icons/search.svg' />
			<input
				value={query}
				onChange={(e) => setQuery(e.target?.value)}
				className='w-full focus:outline-none focus:border-none h-full'
				type='text'
				placeholder='Search for issues'
			/>
			{query && (
				<img className='w-4 cursor-pointer' src='/icons/close-circle.svg' onClick={clearQuery} />
			)}
		</div>
	);
};

export default Search;
