import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

import InputWrapper from "../control/InputWrapper";
import { IIssuePayload } from "../../types/data/issue";

interface IIssueForm {
	isLoading?: boolean;
	initialValues?: IIssuePayload;
	onSubmit: (payload: IIssuePayload) => void;
}

const validationSchema = Yup.object().shape({
	title: Yup.string().required("Title is required"),
	description: Yup.string().required("Description is required"),
});

const IssueForm = ({ isLoading, initialValues, onSubmit }: IIssueForm) => {
	return (
		<Formik
			initialValues={initialValues ? { ...initialValues } : { title: "", description: "" }}
			validationSchema={validationSchema}
			onSubmit={(values) => {
				onSubmit(values);
			}}
		>
			{({ isSubmitting, errors }) => (
				<Form className='space-y-4'>
					<InputWrapper label='Issue Title' error={errors.title}>
						<Field
							id='title'
							name='title'
							type='text'
							className='p-4 block w-full border-2 border-gray-100 rounded-md shadow-sm'
						/>
					</InputWrapper>
					<InputWrapper label='Description' error={errors.description}>
						<Field
							id='description'
							name='description'
							as='textarea'
							className='p-4 block w-full border-2 border-gray-100 rounded-md shadow-sm'
						/>
					</InputWrapper>

					<div>
						<button
							type='submit'
							disabled={isSubmitting || isLoading}
							className='px-4 py-2 bg-blue-500 text-white rounded'
						>
							{initialValues?.id ? "Save Changes" : "Create New Issue"}
						</button>
					</div>
				</Form>
			)}
		</Formik>
	);
};

export default IssueForm;
