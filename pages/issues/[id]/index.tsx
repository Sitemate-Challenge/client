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
	const [loading, setLoading] = useState<boolean>(false);

	const fetchIssue = async () => {
		try {
			setLoading(true);
			const url = `http://localhost:5000/api/v1/issues/${id}`;
			const res = await axios.get(url);
			setIssueData(res?.data?.data);
		} catch (err) {
			alert(err);
		} finally {
			setLoading(false);
		}
	};

	const deleteIssue = async () => {
		if (loading) return;
		try {
			setLoading(true);
			const url = `http://localhost:5000/api/v1/issues/${id}`;
			await axios.delete(url);
			alert("Issue deleted");
		} catch (err) {
			alert(err);
		} finally {
			router.push("/");
			setLoading(false);
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
					<div className='flex flex-row items-between w-full'>
						<h1 className='text-2xl w-full'>{issueData?.title}</h1>
						<div className='flex flex-row gap-x-2'>
							<button
								className='flex flex-row cursor-pointer bg-sky-200 py-2 px-4 hover:bg-sky-300 rounded gap-x-2 items-center whitespace-nowrap'
								onClick={() => router.push(`/issues/${id}/edit`)}
							>
								Edit
								<img className='w-4' src='/icons/pencil.svg' />
							</button>
							<button
								className='flex flex-row cursor-pointer bg-red-200 py-2 px-4 hover:bg-red-300 rounded gap-x-2 items-center whitespace-nowrap'
								onClick={deleteIssue}
							>
								Delete Issue
								<img className='w-4' src='/icons/bin.svg' />
							</button>
						</div>
					</div>
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
