import axios from "axios";
import IssueForm from "../../components/form/IssueForm";
import Default from "../../layouts/default";
import { IIssuePayload } from "../../types/data/issue";
import { useState } from "react";
import { useRouter } from "next/router";

const CreateIssuePage = () => {
	const router = useRouter();
	const [loading, setLoading] = useState<boolean>(false);

	const onSubmit = async (payload: IIssuePayload) => {
		try {
			setLoading(true);
			const url = "http://localhost:5000/api/v1/issues";
			const res = await axios.post(url, payload);
			const data = res?.data?.data;
			alert("Issue created");
			router.push(`/issues/${data?.id}`);
		} catch (err) {
			alert(err);
		} finally {
			setLoading(false);
		}
	};
	return (
		<Default title='Create New Issue' withBack>
			<div className='p-8 flex flex-col gap-y-4'>
				<IssueForm onSubmit={onSubmit} isLoading={loading} />
			</div>
		</Default>
	);
};

export default CreateIssuePage;
