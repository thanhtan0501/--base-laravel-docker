import { cn } from '@/Lib/utils';
import { PaginationMeta } from '@/Types';
import React from 'react';
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from '../ui/pagination';

interface PaginationSessionProps {
    className?: string;
    pagination: PaginationMeta;
    onSelectedPage: (val: number) => void;
}

const PaginationSession: React.FC<PaginationSessionProps> = ({
    className,
    pagination,
    onSelectedPage,
}) => {
    const handleTransitionsPage = (page: number) => () => {
        if (page < 1 || page > pagination.last_page) return;
        onSelectedPage(page);
    };
    return (
        <div className={cn('', className)}>
            <Pagination>
                <PaginationContent>
                    <PaginationItem
                        aria-disabled={pagination.current_page === 1}
                        key={`pagination-prev`}
                    >
                        <PaginationPrevious
                            onClick={handleTransitionsPage(
                                pagination.current_page - 1,
                            )}
                        />
                    </PaginationItem>
                    {Array.from({ length: pagination.last_page }).map(
                        (_, index) => {
                            const page = index + 1;
                            if (
                                page === 1 ||
                                page === pagination.last_page ||
                                (page >= pagination.current_page - 1 &&
                                    page <= pagination.current_page + 1)
                            ) {
                                return (
                                    <PaginationItem
                                        key={`pagination-link-${page}`}
                                    >
                                        <PaginationLink
                                            className="cursor-pointer"
                                            isActive={
                                                pagination.current_page === page
                                            }
                                            onClick={handleTransitionsPage(
                                                page,
                                            )}
                                            size={'sm'}
                                        >
                                            {page}
                                        </PaginationLink>
                                    </PaginationItem>
                                );
                            } else if (
                                page === pagination.current_page - 2 ||
                                page === pagination.current_page + 2
                            ) {
                                return (
                                    <PaginationItem
                                        key={`pagination-ellipsis-${page}`}
                                    >
                                        <PaginationEllipsis />
                                    </PaginationItem>
                                );
                            } else return null;
                        },
                    )}
                    <PaginationItem
                        key={`pagination-next`}
                        aria-disabled={
                            pagination.current_page === pagination.last_page
                        }
                    >
                        <PaginationNext
                            aria-disabled={
                                pagination.current_page === pagination.last_page
                            }
                            onClick={handleTransitionsPage(
                                pagination.current_page + 1,
                            )}
                        />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </div>
    );
};

export default PaginationSession;
