import axios from "axios";
import { useEffect, useState } from "react";
import { IIssueData, IIssuePayload } from "../../../types/data/issue";
import Default from "../../../layouts/default";
import IssueForm from "../../../components/form/IssueForm";
import { useRouter } from "next/router";

const EditIssuePage = () => {
	const router = useRouter();
	const { id } = router.query;
	const [loading, setLoading] = useState<boolean>(false);
	const [issueData, setIssueData] = useState<IIssueData>();

	useEffect(() => {
		if (id) fetchIssue();
	}, [id]);

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

	const onSubmit = async (payload: IIssuePayload) => {
		try {
			setLoading(true);
			const url = `http://localhost:5000/api/v1/issues/${id}`;
			await axios.put(url, payload);
			alert("Issue updated");
			router.push(`/issues/${id}`);
		} catch (err) {
			alert(err);
		} finally {
			setLoading(false);
		}
	};
	return (
		<Default title='Update Issue' withBack>
			<div className='p-8 flex flex-col gap-y-4'>
				{issueData?.id ? (
					<IssueForm initialValues={issueData} onSubmit={onSubmit} isLoading={loading} />
				) : (
					<></>
				)}
			</div>
		</Default>
	);
};

export default EditIssuePage;
