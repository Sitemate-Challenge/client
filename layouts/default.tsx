import { useRouter } from "next/router";
import { ReactNode } from "react";

interface TemplateProps {
	title?: string;
	withBack?: boolean;
	children?: ReactNode;
}

export default ({ children, title, withBack }: React.PropsWithChildren<TemplateProps>) => {
	const router = useRouter();
	return (
		<div className='w-full h-screen text-gray-700'>
			<div className='w-full px-8 py-4 text-2xl font-md bg-gray-50 flex flex-row gap-x-2 items-center'>
				{withBack && (
					<img src='/icons/circle-left.svg' className='w-4 cursor-pointer' onClick={router.back} />
				)}
				{title || "Issue Tracker"}
			</div>
			<div>{children}</div>
			<div className='footer px-8 py-4 bg-gray-50 fixed bottom-0 w-full'>
				©Michael Philip Gunadi 2024
			</div>
		</div>
	);
};
