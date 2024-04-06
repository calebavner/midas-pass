import {Search, MoreHorizontal, ChevronsLeft, ChevronLeft, ChevronRight, ChevronsRight} from 'lucide-react';
import dayjs from 'dayjs'
import 'dayjs/locale/pt-br'
import relativeTime from 'dayjs/plugin/relativeTime'
import { IconButton } from './icon-button';
import { Table } from './table/table';
import { TableHeader } from './table/table-header';
import { TableCell } from './table/table-cell';
import { TableRow } from './table/table-row';
import { ChangeEvent, useState } from 'react';
import { attendees } from '../data/attendees';

dayjs.extend(relativeTime)
dayjs.locale('pt-br')

export function AttendeeList() {

    const [searchInput, setSearch] = useState('');
    const [page, setPage] = useState(1)
    const totalPages = Math.ceil(attendees.length / 10)

    function onSearchInputChange(event: ChangeEvent<HTMLInputElement>) {
        setSearch(event.target.value);
    }

    function nextPage() {
        setPage(page + 1)
    }

    function previousPage() {
        setPage(page - 1)
    }

    function lastPage() {
        setPage(totalPages)
    }

    function firstPage() {
        setPage(1)
    }

    return (
        <div className='flex flex-col gap-4'>
            <div className="flex gap-3 items-center">
                <h1 className="text-2xl font-bold">Participantes</h1>
                <div className="px-3 w-72 py=1.5 border border-white/10 rounded-lg text-sm flex items-center gap-3">
                    <Search className='size-4 text-emerald-300'/>
                    <input onChange={onSearchInputChange} className="bg-transparent flex-1 outline-none border-0 p-0 text-sm" placeholder="buscar participantes" />
                </div>
                {searchInput}            
            </div>

            <Table>
                <thead>
                    <tr className='border-b border-white/10'>
                        <TableHeader style={{ width: 64 }}>
                            <input type='checkbox' className='size-4 bg-black/20 rounded-md border border-white/10 checked:bg-orange-400'/>
                        </TableHeader>
                        <TableHeader>Codigo</TableHeader>
                        <TableHeader>Participante</TableHeader>
                        <TableHeader>Data de Inscrição</TableHeader>
                        <TableHeader>Data de Check-in</TableHeader>
                        <TableHeader style={{ width: 64 }}></TableHeader>
                    </tr>
                </thead>
                <tbody>
                    {attendees.slice((page - 1) * 10, page * 10).map((a) => {
                        return (
                            <TableRow key={a.id} >
                        <TableCell>
                            <input type='checkbox' className='size-4 bg-black/20 rounded-md border border-white/10 checked:bg-orange-400'/>
                        </TableCell>
                        <TableCell>{a.id}</TableCell>
                        <TableCell>
                            <div className='flex flex-col gap-1'>
                                <span className='font-semibold text-white'>{a.name}</span>
                                <span>{a.email}</span>
                            </div>
                        </TableCell>
                        <TableCell>{dayjs().to(a.createdAt)}</TableCell>   
                        <TableCell>{dayjs().to(a.checkedInAt)}</TableCell>  
                        <TableCell>
                            <IconButton transparent>
                                <MoreHorizontal className='size-4' />
                            </IconButton>
                        </TableCell>               
                    </TableRow>
                        )
                    })}
                </tbody>
                <tfoot >
                    <tr>
                        <TableCell colSpan={3}>
                            Mostrando 10 de {attendees.length} itens
                        </TableCell>
                        <TableCell colSpan={3} className='text-right'>
                            <div className='inline-flex gap-8 items-center'>
                                <span>Pagina {page} de {totalPages}</span>

                                <div className='flex gap-1.5'>
                                    <IconButton onClick={firstPage} disabled={page === 1}>
                                        <ChevronsLeft className='size-4' />
                                    </IconButton>

                                    <IconButton onClick={previousPage} disabled={page === 1}>
                                        <ChevronLeft className='size-4' />
                                    </IconButton>

                                    <IconButton onClick={nextPage} disabled={page === totalPages}>
                                        <ChevronRight className='size-4' />
                                    </IconButton>

                                    <IconButton onClick={lastPage} disabled={page === totalPages}>
                                        <ChevronsRight className='size-4' />
                                    </IconButton>
                                </div>
                            </div>
                        </TableCell>
                    </tr>
                </tfoot>
            </Table>
        </div>
    )
}