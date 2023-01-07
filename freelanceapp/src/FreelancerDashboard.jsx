import {useEffect, useState} from 'react';
import axios from 'axios';

const FreelancerDashboard = () =>{
  const [datas, setDatas] = useState([]);  
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const getUsers = async () => {
      const response = await axios.get('http://localhost:8000/admin/freelancers');
      const users =  await response?.data;
      console.log(users)
      setDatas(users)
    };
    getUsers();
    setLoading(false);
  }, []);

  return(
  <>
    {loading? (<><h1>Loading ....</h1></>):(
<div className="w-full max-w-md  ml-10 mt-12 mb-10 mr-10 bottom-6 p-4 bg-white border rounded-lg shadow-md sm:p-8 dark:bg-gray-800 dark:border-gray-700">
    <div className="flex items-center justify-between mb-4">
        <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">Our Freelancers</h5>
        <a href="#" className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500">
            View all
        </a>
   </div>
   <div className="flow-root">
        <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
      {
       datas.map((user, id)=>{
       return(   
         <li className="py-3 sm:py-4">
                <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                        <img className="w-8 h-8 rounded-full" src="https://images.unsplash.com/photo-1475855581690-80accde3ae2b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80" alt="Neil image"/>
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                            {user.firstName}{user.lastName}
                        </p>
                        <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                              {user.email}
                        </p>
                    </div>
                    <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                        $320
                    </div>
                </div>
            </li>
       )})}
        </ul>

    </div>
</div>)
    }
  </> 
  )
}

export default FreelancerDashboard;
