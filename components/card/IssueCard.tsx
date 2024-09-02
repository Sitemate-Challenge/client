import React from "react";
import dayjs from "dayjs";
import { IIssueData } from "../../types/data/issue";
import Link from "next/link";

interface IIssueCardProps {
	data: IIssueData;
}

const IssueCard = ({ data }: IIssueCardProps) => {
	const date = dayjs(data.createdAt).format("DD-MM-YYYY");
	return (
		<Link href={`/issues/${data.id}`}>
			<div className='w-full p-4 shadow-md rounded-md border-l-2 border-sky-200'>
				<small className='text-gray-400'>{date}</small>
				<h2 className='text-gray-600'>{data.title}</h2>
			</div>
		</Link>
	);
};

export default IssueCard;
