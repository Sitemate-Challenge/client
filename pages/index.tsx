import React, { useEffect, useState } from "react";

import IssueCard from "../components/card/IssueCard";
import Search from "../components/control/Search";

import Default from "../layouts/default";
import debounce from "../utils/debounce";
import axios, { AxiosRequestConfig } from "axios";

const HomePage = () => {
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

	const clearQuery = () => {
		setQ("");
	};

	const handleChangeQ = (val) => {
		setQ(val);
		handleSearch();
	};

	const handleSearch = debounce(() => fetchIssues(), 300);

	useEffect(() => {
		fetchIssues();
	}, []);

	return (
		<Default>
			<div className='p-8 flex flex-col gap-y-4'>
				<Search query={q} setQuery={handleChangeQ} clearQuery={clearQuery} />
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
