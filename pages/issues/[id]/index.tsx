import { useEffect, useState } from "react";

import Default from "../../../layouts/default";
import { IIssueData } from "../../../types/data/issue";
import { useRouter } from "next/router";
import axios from "axios";
import dayjs from "dayjs";

const IssueDetailPage = () => {
	const router = useRouter();
	const { id } = router.query;
	const [issueData, setIssueData] = useState<IIssueData>();

	const fetchIssue = async () => {
		try {
			const url = `http://localhost:5000/api/v1/issues/${id}`;
			const res = await axios.get(url);
			setIssueData(res?.data?.data);
		} catch (err) {
		} finally {
		}
	};

	useEffect(() => {
		if (id) fetchIssue();
	}, [id]);

	const date = issueData?.createdAt
		? dayjs(issueData?.createdAt).format("DD-MM-YYYY HH:mm:ss")
		: "";

	return (
		<Default withBack title={issueData?.title}>
			<div className='p-8 flex flex-col gap-y-4'>
				<div className='flex flex-col gap-y-0'>
					<p className='text-gray-400 text-sm'>Issued At: {date}</p>
					<h1 className='text-2xl'>{issueData?.title}</h1>
				</div>
				<div className='border-2 border-gray-200 p-4 rounded-lg flex flex-col gap-y-4'>
					<p className='text-xl pb-2 font-md border-b-2 border-gray-200'>Description</p>
					<p className='text-md text-gray-600'>{issueData?.description}</p>
				</div>
			</div>
		</Default>
	);
};

export default IssueDetailPage;
