import React from 'react'
import Select from 'react-select'
import chroma from "chroma-js"

const colourStyles = {
    control: styles => ({ ...styles, backgroundColor: 'white', fontWeight: "500" }),
    option: (styles, { data, isDisabled, isFocused, isSelected }) => {
      const color = chroma(data.color);
      return {
        ...styles,
        backgroundColor: isDisabled
          ? null
          : isSelected
          ? data.color
          : isFocused
          ? color.alpha(0.1).css()
          : null,
        color: isDisabled
          ? '#ccc'
          : isSelected
          ? chroma.contrast(color, 'white') > 2
            ? 'white'
            : 'black'
          : data.color,
        cursor: isDisabled ? 'not-allowed' : 'default',
  
        ':active': {
          ...styles[':active'],
          backgroundColor:
            !isDisabled && (isSelected ? data.color : color.alpha(0.3).css()),
        },
      };
    },
    multiValue: (styles, { data }) => {
      const color = chroma(data.color);
      return {
        ...styles,
        backgroundColor: color.alpha(0.1).css(),
      };
    },
    multiValueLabel: (styles, { data }) => ({
      ...styles,
      color: data.color,
    }),
    multiValueRemove: (styles, { data }) => ({
      ...styles,
      color: data.color,
      ':hover': {
        backgroundColor: data.color,
        color: 'white',
      },
    }),
  };

const ColumnFilter = ({ column }) => {
    
    const { setFilter, preFilteredRows, id } = column
    
    const options = React.useMemo(() => {
        let allVals = []
        let uniqueVals = []

        const reduceFunc = (arr) => {
            return arr.reduce((req, i) => {
                if (!req.some(obj => obj.label === i.label && obj.value === i.value)) {
                    req.push(i);
                }
                return req;
            }, []);
        }

        preFilteredRows.forEach(row => {
            if (Array.isArray(row.values[id])){
                row.values[id].forEach(item => {
                    allVals.push({ label: item.name, value: item.name, color: item.color})
                    uniqueVals = reduceFunc(allVals)
                })
            } else {
                allVals.push({ label: row.values[id].name, value: row.values[id].name, color: row.values[id].color }) 
                uniqueVals = reduceFunc(allVals)
            }
        })

        return uniqueVals
      }, [id, preFilteredRows])

    return (
        <span>
            <Select
                isMulti
                isSearchable
                isClearable
                onChange={e => {
                    let vals = e.map(i => {return i.value})
                    setFilter(vals)
                }}
                options={options}
                styles={colourStyles}
            />
         </span>

    )
}

export default ColumnFilter

