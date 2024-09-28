import React from 'react';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Badge } from './ui/badge';
import { useSelector } from 'react-redux';

const AppliedJobTable = () => {
    const { allAppliedJobs } = useSelector(store => store.job);

    return (
        <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-4 rounded-lg">
            <Table>
                <TableCaption className="text-white">The list of your applied jobs</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="text-white">Date</TableHead>
                        <TableHead className="text-white">Job Role</TableHead>
                        <TableHead className="text-white">Company</TableHead>
                        <TableHead className="text-right text-white">Status</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        allAppliedJobs.length <= 0 ? <span className="text-white">You haven't applied to any jobs yet.</span> : allAppliedJobs.map((appliedJob) => (
                            <TableRow key={appliedJob._id}>
                                <TableCell className="text-white">{appliedJob?.createdAt?.split("T")[0]}</TableCell>
                                <TableCell className="text-white">{appliedJob.job?.title}</TableCell>
                                <TableCell className="text-white">{appliedJob.job?.company?.name}</TableCell>
                                <TableCell className="text-right">
                                    <Badge className={`text-white ${appliedJob?.status === "rejected" ? 'bg-red-400' : appliedJob.status === 'pending' ? 'bg-gray-400' : 'bg-green-400'}`}>
                                        {appliedJob.status.toUpperCase()}
                                    </Badge>
                                </TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
        </div>
    );
}

export default AppliedJobTable;
