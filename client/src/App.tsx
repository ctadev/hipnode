// import React, { useEffect } from 'react';
// import { Header, BottomHeader } from './components/Header';
// import Routes from './routes/Routes';
// import { BrowserRouter as Router } from 'react-router-dom';
// import { useSelector, useDispatch } from 'react-redux';
// import { setThemeState } from './app/themeStateSlice';

// export default function App() {
//   const { theme } = useSelector((state) => state.theme);
//   const dispatch = useDispatch();

//   useEffect(() => {
//     if (theme) {
//       if (theme === 'dark') {
//         document.documentElement.classList.add('dark');
//         dispatch(setThemeState(true));
//       } else if (theme === 'light') {
//         document.documentElement.classList.remove('dark');
//         dispatch(setThemeState(false));
//       }
//       localStorage.setItem('theme', theme);
//     }
//   }, [theme]);

//   return (
//     <>
//       <Router>
//         <main className="relative">
//           <Routes />
//         </main>
//       </Router>
//     </>
//   );
// }

// import React, { useEffect, useState } from 'react';

// export default function App() {
//   const [data, setData] = useState([]);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const res = await fetch('http://localhost:8000/posts/12');
//         if (!res.ok) {
//           const errorData = await res.json();
//           throw new Error(errorData.message);
//         }
//         const data = await res.json();
//         setData(data);
//         setError('');
//       } catch (err) {
//         setError(err.message);
//       }
//     };

//     fetchData();
//   }, []);

//   return (
//     <div>
//       {error && <div>Error: {error}</div>}
//       {data && <div>{JSON.stringify(data)}</div>}
//     </div>
//   );

// import axios, { AxiosError } from 'axios';
// import React, { useEffect, useState } from 'react';

// interface IData {
//   id: number;
//   title: string;
//   content: string;
//   image_url: string;
//   user_id: number;
//   group_id: number;
//   view_count: number;
//   like_count: number;
//   created_at: Date;
//   updated_at: Date;
// }

// interface IError {
//   message: string;
// }

// export default function App() {
//   const [data, setData] = useState<IData[]>([]);
//   const [error, setError] = useState<string>('');

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const res = await axios.get<IData[]>('http://localhost:8000/posts/2');
//         setData(res.data);
//         setError('');
//       } catch (err) {
//         const errorObj = err as AxiosError<IError>; // casting error to axios error type
//         const errMessage: string =
//           errorObj.response?.data?.message || errorObj.message;
//         setError(errMessage);
//       }
//     };

//     fetchData();
//   }, []);

//   return (
//     <>
//       {error && <div>Error: {error}</div>}
//       <hr />
//       {data && <div>{JSON.stringify(Object.keys(data))}</div>}
//     </>
//   );
// }
