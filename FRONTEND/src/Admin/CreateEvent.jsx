import axios from 'axios'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { useAuth } from '../context/AuthContext'
import { Link, useNavigate } from 'react-router-dom'

const CreateEvent = () => {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState('')
    const [category, setCategory] = useState('')
    const [image, setImage] = useState(null)
    const [preview, setPreview] = useState(null)
    const { fetchEvent } = useAuth()

    const navigate = useNavigate()

    const handleImageChange = (e) => {
        const file = e.target.files[0]
        setImage(file)

        if (file) {
            const imageUrl = URL.createObjectURL(file)
            setPreview(imageUrl)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const formData = new FormData()
            formData.append("title", title)
            formData.append("description", description)
            formData.append("price", price)
            formData.append("category", category)
            formData.append("image", image)

            const res = await axios.post(
                "http://localhost:3000/api/events/create-event",
                formData,
                { withCredentials: true }
            )

            toast.success("Event Created Successfully ✅")
            await fetchEvent()
            navigate('/dashboard')

        } catch (error) {
            console.log(error.response?.data || error.message)
            toast.error("Error creating event ❌")
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center 
        bg-linear-to-br from-purple-500 via-indigo-500 to-blue-500 p-4">

            <form 
                onSubmit={handleSubmit}
                className="backdrop-blur-lg bg-white/20 border border-white/30 
                shadow-2xl rounded-2xl p-8 w-full max-w-lg space-y-5 text-white"
            >
                <h1 className="text-3xl font-bold text-center mb-4">
                    🎉 Create New Event
                </h1>

                <input
                    type="text"
                    placeholder="Event Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full p-3 rounded-lg bg-white/30 placeholder-white 
                    focus:outline-none focus:ring-2 focus:ring-yellow-300"
                />

                <textarea
                    placeholder="Event Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full p-3 rounded-lg bg-white/30 placeholder-white 
                    focus:outline-none focus:ring-2 focus:ring-yellow-300"
                />

                <input
                    type="number"
                    placeholder="Event Price (₹)"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="w-full p-3 rounded-lg bg-white/30 placeholder-white 
                    focus:outline-none focus:ring-2 focus:ring-yellow-300"
                />

                <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full p-3 rounded-lg bg-white/30 text-white"
                >
                    <option value="" className='text-black'>Select Category</option>
                    <option value="Wedding" className='text-black'>Wedding</option>
                    <option value="Birthday" className='text-black'>Birthday</option>
                    <option value="Corporate" className='text-black'>Corporate</option>
                </select>

                <input
                    type="file"
                    onChange={handleImageChange}
                    className="w-full text-sm"
                />

                {preview && (
                    <div className="mt-3">
                        <p className="text-sm mb-1">Preview</p>
                        <img 
                            src={preview} 
                            alt="preview"
                            className="w-full h-44 object-cover rounded-xl border border-white/40"
                        />
                    </div>
                )}

                <button
                    type="submit"
                    className="w-full bg-yellow-400 text-black font-semibold 
                    p-3 rounded-lg hover:bg-yellow-300 transition duration-300"
                >
                    🚀 Create Event
                </button>

                <Link 
                    to="/dashboard"
                    className="block text-center bg-red-400 hover:bg-red-500 
                    p-3 rounded-lg transition duration-300"
                >
                    ⬅ Back to Dashboard
                </Link>
            </form>
        </div>
    )
}

export default CreateEvent