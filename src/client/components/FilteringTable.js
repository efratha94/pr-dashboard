import React, { useMemo, useState, useEffect } from 'react'
import { useTable, useSortBy, useFilters } from 'react-table'
import axios from "axios"

import Columns from "./Columns"
import preparePRs from "../services/preparePRs"
import ColumnFilter from "./ColumnFilter"
import getRandomColor from "../services/colours"

import Icon from '@material-ui/core/Icon'
import MaUTable from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import { withStyles, makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
    sortGrid: {
        display: 'grid',
        gridTemplateColumns: '0.18fr 1.5fr',
        alignItems: "center",
        justifyItems: "start",
        textAlign: "center"
    },

    filterGrid: {
        width: "100%",
        gridTemplateRows: '1fr 1fr',
        alignItems: "center",
        justifyItems: "start",
        textAlign: "center"
    }
}));


const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: theme.palette.error.light,
        color: theme.palette.common.white,
        fontWeight: 700,
        fontFamily: 'Lato, sans-serif',
        letterSpacing: '0.07em',
        textAlign: "center"
    },
    body: {
        fontWeight: 600,
        letterSpacing: "0.05em",
        alignItems: "center",
        justifyItems: "center",
        textAlign: "center",
        fontFamily: 'Lato, sans-serif',
    },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
    },
}))(TableRow);


const FilteringTable = () => {
    const [pullRequests, setPullRequests] = useState([])

    const classes = useStyles();

    useEffect(() => {
        const fetchPRs = async () => {
            const listOfPRs = await axios.get("https://api.github.com/repos/nodejs/node/pulls?state=all")
            
            if (listOfPRs.status !== 200) throw Error(listOfPRs.message);

            const formattedPRs = await preparePRs(listOfPRs.data)
            const formattedFiltered = await getRandomColor(formattedPRs)
            setPullRequests(formattedFiltered)
        }

        fetchPRs()

    }, [setPullRequests])

    const columns = useMemo(() => Columns, [])
    const data = useMemo(() => pullRequests)

    const defaultColumn = useMemo(() => {
        return {
            Filter: ColumnFilter
        }
    }, [])

    const filterTypes = React.useMemo(
        () => ({
            multiSelectFilter: (rows, id, filterValue) => {

                let filtered = rows.map(row => {
                    let labelNames = {}
                    let rowLabels = row.values[id]
                    let matchedRows = []

                    if (id[0] === "pr_labels") {

                        rowLabels.forEach(label => {
                            labelNames[label.name] = label.name
                        })

                        if (filterValue.length === 1) {
                            matchedRows = rowLabels.map(label => {
                                if (label.name === filterValue[0]) return row
                            }).filter(elem => elem !== undefined)

                        } else {

                            const checkMultiLabels = (filterName) => {
                                return labelNames[filterName]
                            }

                            let filterEvery = filterValue.every(checkMultiLabels)
                            if (filterEvery === true) {
                                matchedRows.push(row)
                            }
                        }

                        if (matchedRows.length > 0) return matchedRows[0]

                    } else {
                        if (row.values[id].name === filterValue[0]) {
                            return row
                        }
                    }

                }).filter(elem => elem !== undefined)

                return filterValue.length === 0 ? rows : filtered
            }
        }),
        []
    );

    const tableInstance = useTable({
        columns,
        data,
        defaultColumn,
        filterTypes
    },
        useFilters,
        useSortBy
    )

    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = tableInstance

    return (
        data.length === 0 ?
            null :
            <MaUTable stickyHeader {...getTableProps()} id="table">
                <TableHead >
                    {headerGroups.map(headerGroup => (
                        <TableRow {...headerGroup.getHeaderGroupProps()} >
                            {headerGroup.headers.map(column => (
                                <StyledTableCell {...column.getHeaderProps(column.getSortByToggleProps())} align="center" >
                                    <div id="header" className={column.canSort ? classes.sortGrid : column.canFilter ? classes.filterGrid : null}>
                                        {
                                            column.canSort ?
                                                column.isSorted ?
                                                    <span id="sort">
                                                        {column.isSortedDesc ? <Icon>expand_more</Icon> : <Icon>expand_less</Icon>}
                                                    </span> :
                                                    <Icon>unfold_more</Icon> :
                                                null

                                        }
                                            <span id="header_title">{column.render('Header')}</span>
                                        {
                                            column.canFilter ?
                                                <span id="filter">{column.render('Filter')}</span> :
                                                null
                                        }
                                    </div>
                                </StyledTableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableHead>
                <TableBody {...getTableBodyProps()} >
                    {rows.map(row => {
                        prepareRow(row)
                        return (
                            <StyledTableRow {...row.getRowProps()}>
                                {row.cells.map(cell => {
                                    return <StyledTableCell {...cell.getCellProps()}>{cell.render("Cell")}</StyledTableCell>
                                })}
                            </StyledTableRow>
                        )
                    })}
                </TableBody>
            </MaUTable>
    )
}

export default FilteringTable