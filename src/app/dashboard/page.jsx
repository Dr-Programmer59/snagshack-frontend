"use client"
import React, { useEffect, useState } from 'react'
import { motion } from "framer-motion";
import { useSelector } from 'react-redux';
import axios from 'axios';
import Button from '../components/button';
import { toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  BarChart,
  Users,
  DollarSign,
  TrendingUp,
  Play,
  Eye,
  MessageSquare,
  ThumbsUp,
  Clock,
  Globe,
  ChevronRight,
} from "lucide-react";
function DataCardGrid({ totalusers, subscribers, revenue }) {

  const cards = [
    {
      title: "Total Users",
      value: `${totalusers}`,
      icon: BarChart,
      color: "bg-blue-500",
    },
    {
      title: "Subscribers",
      value: `${subscribers}`,
      icon: Users,
      color: "bg-green-500",
    },
    {
      title: "Revenue",
      value: `$${revenue}`,
      icon: DollarSign,
      color: "bg-yellow-500",
    },
    {
      title: "Growth",
      value: "+12.3%",
      icon: TrendingUp,
      color: "bg-purple-500",
    },
  ];
  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-10">
      {cards.map((card, index) => (
        <DataCard key={index} {...card} />
      ))}
    </div>
  );
}
function DataCard({ title, value, icon: Icon, color }) {
  return (
    <motion.div
      className="bg-[#2A2D31] p-6 rounded-lg shadow-lg overflow-hidden relative"
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-gray-400 text-sm font-medium">{title}</h3>
        <div className={`p-2 rounded-full ${color}`}>
          <Icon className="text-white" size={20} />
        </div>
      </div>
      <p className="text-3xl font-bold text-white">{value}</p>
      <div className={`absolute bottom-0 left-0 w-full h-1 ${color}`} />
    </motion.div>
  );
}

function page() {
  const { user } = useSelector(store => store.userReducer);
  const [usersdetails, setusersdetails] = useState([])
  const [limit, setlimit] = useState({})
  const [searchQuery, setSearchQuery] = useState('');
  const [totalusers, settotalusers] = useState(0)
  const [subscribers, setsubscribers] = useState(0)
  const [revenue, setrevenue] = useState(0)

  const filteredUsers = usersdetails.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const fetchUSers = async () => {
    const { data } = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/users`, {
      withCredentials: true
    });

    console.log(data)
    settotalusers(data.users.length);

    let sub = 0;

    data.users.forEach(element => {
      if (element.subscription_plan) sub += 1
    });
    setsubscribers(sub)
    setrevenue(sub * 59)

    setusersdetails(data.users)
    const tempResult = {};
    data.users.forEach(item => {
      tempResult[item.id] = item.limit;
    });

    // Update the state with the new object
    setlimit(tempResult);



  }
  const handleUser = async (id) => {
    console.log("id ", id)
    const user = usersdetails.find(user => user._id === id);
    if (user) {
      const api = await axios.create({
        baseURL: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1`,
        withCredentials: true
      });
      const { data } = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/increase-limit`, { incLimit: limit[id], userId: id }, {
        withCredentials: true
      });
      if (data) {
        toast.success('Limit increased for the user', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Bounce,
        });
        await fetchUSers()
      }
    }
  }


  useEffect(() => {
    fetchUSers()


  }, [])
  const handleChange = (id, newLimit) => {
    setlimit(prevResult => ({
      ...prevResult,
      [id]: newLimit // Update only the specific `id` key with the new value
    }));
  };
  return (
    <>
      {
        user && user.role == "admin" ?
          <div className=''>
            <DataCardGrid totalusers={totalusers} subscribers={subscribers} revenue={revenue} />

            <div>

              <div href="#" class="block max-w p-10 m-10 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">

                <div className="overflow-x-auto">
                  <div className="flex justify-end mb-4">
                    <input
                      type="text"
                      placeholder="Search..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="border text-black px-4 py-2 rounded-lg focus:outline-none  "
                    />
                  </div>
                  <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-900 uppercase dark:text-gray-400">
                      <tr>
                        <th scope="col" className="px-6 py-3">Name</th>
                        <th scope="col" className="px-6 py-3">Email address</th>
                        <th scope="col" className="px-6 py-3">Plan</th>
                        <th scope="col" className="px-6 py-3">Limit Today</th>
                        <th scope="col" className="px-6 py-3">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredUsers.map((value) => (
                        <tr className="bg-white dark:bg-gray-800" key={value._id}>
                          <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            {value.name}
                          </th>
                          <td className="px-6 py-4">{value.email}</td>
                          <td className="px-6 py-4">{value.subscription_plan}</td>
                          <td className="px-6 py-4">{value.limit}</td>
                          <td className="px-6 py-4">
                            <input
                              type="number"
                              value={limit[value._id] || ''}
                              onChange={(e) => handleChange(value._id, e.target.value)}
                              className="border"
                            />
                            <button
                              onClick={() => handleUser(value._id)}
                              className="bg-primary text-black mt-1 px-4 py-2 rounded-lg"
                            >
                              Increase Limit
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

          </div>
          : "not allowed"
      }
    </>

  )
}

export default page