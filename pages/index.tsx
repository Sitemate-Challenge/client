import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

import Search from "../components/control/Search";
import IssueCard from "../components/card/IssueCard";

import Default from "../layouts/default";
import debounce from "../utils/debounce";

const HomePage = () => {
	const router = useRouter();

	const [q, setQ] = useState<string>("");
	const [issues, setIssues] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	const fetchIssues = async () => {
		try {
			setLoading(true);
			const url = "http://localhost:5000/api/v1/issues";
			const params: any = {};
			if (q) params.search = q;

			const res = await axios.get(url, { params });
			setIssues(res?.data?.data);
		} catch (error) {
			setError(error.message);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		handleSearch();
	}, [q]);

	const clearQuery = () => {
		setQ("");
	};

	const handleChangeQ = (val) => {
		setQ(val);
	};

	const handleSearch = debounce(() => {
		fetchIssues();
	}, 500);

	useEffect(() => {
		fetchIssues();
	}, []);

	return (
		<Default>
			<div className='p-8 flex flex-col gap-y-4'>
				<div className='flex flex-row gap-x-4'>
					<Search query={q} setQuery={handleChangeQ} clearQuery={clearQuery} />
					<button
						className='bg-sky-200 rounded cursor-pointer whitespace-nowrap px-4 hover:bg-sky-300 transition-[background-color] duration-50 ease font-medium text-gray-700'
						onClick={() => router.push("/issues/new")}
					>
						Add New +
					</button>
				</div>
				{error && (
					<div>
						<p>Error: {error}</p>
					</div>
				)}
				<div className='flex flex-col gap-y-4'>
					{issues.map((issue) => (
						<IssueCard data={issue} />
					))}
				</div>
			</div>
		</Default>
	);
};

export default HomePage;
