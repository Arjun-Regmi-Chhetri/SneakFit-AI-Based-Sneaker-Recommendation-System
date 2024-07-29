import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addProductSizeServices } from '../../../../service/Service';

const AddSize = () => {
    const [sizeName, setSizeName] = useState('');
    const navigate = useNavigate();

    const handleSizeName = (e) => {
        setSizeName(e.target.value);
    };

    const handleSize = async (sizeName) => {
        try {
            const post = await addProductSizeServices(sizeName.toUpperCase());
            console.log('Size saved successfully:', post);

            navigate('/admin/SneakerSize', { state: { successMessage: "Size Added Successfully" } });
        } catch (error) {
            console.error('There was an error saving the size!', error);
        }
    };

    const saveSize = (e) => {
        e.preventDefault();
        handleSize(sizeName);
        console.log(sizeName);
    };

    return (
        <div>
            <form className="space-y-2" onSubmit={saveSize}>
                <div className="px-2 p-3">
                    <label htmlFor="categoryName" className="text-2xl">Size Name:</label>
                    <input
                        type="text"
                        id="categoryName"
                        value={sizeName}
                        onChange={handleSizeName}
                        className="px-3 mx-3 h-10 bg-gray-500 rounded"
                        required
                    />
                </div>
                <button type="submit" className="bg-blue-400 w-100 p-4 cursor hover:bg-blue-500">Add Size</button>
            </form>
        </div>
    );
};

export default AddSize;
