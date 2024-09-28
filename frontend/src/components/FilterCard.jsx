import React, { useEffect, useState } from 'react'
import { RadioGroup, RadioGroupItem } from './ui/radio-group'
import { Label } from './ui/label'
import { useDispatch } from 'react-redux'
import { setSearchedQuery } from '@/redux/jobSlice'

const fitlerData = [
    {
        "filterType": "Location",
        "array": [
            "North America", 
            "Europe", 
            "Asia", 
            "South America", 
            "Australia",
            "Central America"
        ]
    },
    {
        "filterType": "Industry",
        "array": [
            "Frontend Developer", 
            "Backend Developer", 
            "FullStack Developer",
            "Data Scientist",
            "DevOps Engineer",
            "Product Manager",
            "UI/UX Designer",
            "AI/ML Engineer",
            "Cloud Architect"
        ]
    },
    {
        "filterType": "Salary",
        "array": ["0-50k", "50k-100k", "100k-150k", "150k-200k", "200k+"]
    },
]

const FilterCard = () => {
    const [selectedValue, setSelectedValue] = useState('');
    const dispatch = useDispatch();

    const changeHandler = (value) => {
        setSelectedValue(value);
    }

    useEffect(() => {
        dispatch(setSearchedQuery(selectedValue));
    }, [selectedValue, dispatch]);

    return (
        <div className='w-full bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-600 p-3 rounded-md'>
            <h1 className='font-bold text-lg text-white'> Filter Jobs</h1>
            <hr className='mt-3 border-gray-600' />
            <RadioGroup value={selectedValue} onValueChange={changeHandler}>
                {
                    fitlerData.map((data, index) => (
                        <div key={index} className='my-2'>
                            <h1 className='font-bold text-lg text-white'>{data.filterType}</h1>
                            {
                                data.array.map((item, idx) => {
                                    const itemId = `id${index}-${idx}`
                                    return (
                                        <div className='flex items-center space-x-2 my-2' key={itemId}>
                                            <RadioGroupItem 
                                                value={item} 
                                                id={itemId} 
                                                className='w-4 h-4 border border-gray-500 rounded-full bg-gray-700 checked:bg-blue-500 checked:border-blue-500'
                                            />
                                            <Label htmlFor={itemId} className='text-gray-300 ml-2'>{item}</Label>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    ))
                }
            </RadioGroup>
        </div>
    )
}

export default FilterCard
