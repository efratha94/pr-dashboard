import React from "react"
import moment from "moment"

import Labels from "./TableBody/Labels"
import Author from "./TableBody/Author"
import Body from "./TableBody/Body"
import Status from "./TableBody/Status"

const Columns = [
    {
        Header: 'Creation Date',
        accessor: "pr_creation_date",
        Cell: ({ value }) => { return moment(value).format("DD/MM/YYYY HH:mm:ss") },
        disableFilters: true,
        disableSortBy: true
    },
    {
        Header: 'PR Number',
        accessor: 'pr_number',
        disableFilters: true
    },
    {
        Header: 'Title',
        accessor: 'pr_title',
        disableFilters: true
    },
    {
        Header: 'Description',
        accessor: 'pr_description',
        Cell: ({ cell: { value } }) => <Body body={value} />,
        disableFilters: true,
        disableSortBy: true
    },
    {
        Header: 'Status',
        accessor: 'pr_status',
        disableSortBy: true,
        Cell: ({ cell: { value } }) => <Status status={value} />,
        filter: "multiSelectFilter"
    },
    {
        Header: 'Labels',
        accessor: 'pr_labels',
        Cell: ({ cell: { value } }) => <Labels values={value} />,
        disableSortBy: true,
        filter: "multiSelectFilter"
    },
    {
        Header: 'Author',
        accessor: "pr_author",
        Cell: ({ cell: { value } }) => <Author user={value} />,
        disableFilters: true,
        disableSortBy: true
    }
]

export default Columns