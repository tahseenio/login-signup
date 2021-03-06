import React, { useEffect, useState } from 'react';
import { doc, setDoc, getDoc } from 'firebase/firestore';

import { useFirebaseContext } from '../context/FirebaseContext';
import 'chart.js/auto';
import { Doughnut } from 'react-chartjs-2';

export const Home = () => {
  const { user, handleSignout, db } = useFirebaseContext();
  const [isLoading, setIsLoading] = useState(true);

  const [colorValues, setColorValues] = useState<number[]>([]);
  const [redValue, setRedValue] = useState(0);
  const [blueValue, setBlueValue] = useState(0);
  const [yellowValue, setYellowValue] = useState(0);
  const [greenValue, setGreenValue] = useState(0);

  const initColorDatabase = async () => {
    try {
      const userNewColors = {
        red: 50,
        blue: 30,
        green: 100,
        yellow: 20,
      };
      await setDoc(doc(db, 'users', `${user.email}`), userNewColors);
      console.log('set new doc for initialisation');
    } catch (error) {
      console.log(error);
    }
  };

  interface colorProps {
    red: number;
    blue: number;
    green: number;
    yellow: number;
  }

  const updateColorDatabase = async (arr: colorProps) => {
    try {
      const userNewColors = { ...arr };
      await setDoc(doc(db, 'users', `${user.email}`), userNewColors, {
        merge: true,
      });
      initDatabase();
      console.log('set new doc for initialisation');
    } catch (error) {
      console.log(error);
    }
  };

  const userColorRef = doc(db, 'users', `${user.email}`);

  const initDatabase = async () => {
    const docSnap = await getDoc(userColorRef);

    if (docSnap.exists()) {
      console.log('DOC EXISTS');
      const docSnapdata = docSnap.data();
      setColorValues([
        docSnapdata.red,
        docSnapdata.blue,
        docSnapdata.yellow,
        docSnapdata.green,
      ]);
      setRedValue(docSnapdata.red);
      setBlueValue(docSnapdata.blue);
      setYellowValue(docSnapdata.yellow);
      setGreenValue(docSnapdata.green);
      setIsLoading(false);
    } else {
      console.log('NO DOC EXISTS');
      initColorDatabase();
      initDatabase();
    }
  };

  useEffect(() => {
    initDatabase();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleColorChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    color: string
  ) => {
    if (typeof e.target.value === 'number') console.log('A NUMER');
    if (color === 'red') setRedValue(Number(e.target.value));
    if (color === 'blue') setBlueValue(Number(e.target.value));
    if (color === 'yellow') setYellowValue(Number(e.target.value));
    if (color === 'green') setGreenValue(Number(e.target.value));
  };

  const handleColorSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newColors = {
      red: Number(redValue),
      blue: Number(blueValue),
      green: Number(greenValue),
      yellow: Number(yellowValue),
    };
    setIsLoading(true);
    updateColorDatabase(newColors);
  };

  const data = {
    labels: ['Red', 'Blue', 'Yellow', 'Green'],
    datasets: [
      {
        label: 'My First Dataset',
        data: colorValues,
        backgroundColor: [
          'rgb(255, 99, 132)',
          'rgb(54, 162, 235)',
          'rgb(255, 205, 86)',
          'rgb(81, 191, 62)',
        ],
        hoverOffset: 4,
      },
    ],
  };

  return (
    <>
      {/* <aside className="side-bar">

      </aside> */}
      <main className='container'>
        <div className='row'>
          <nav>
            <p>Welcome to the Homepage!</p>
            <p>Logged in as: {user.email}</p>
            <button onClick={handleSignout}>Sign Out</button>
          </nav>
          <div className='home__container'>
            <div className='chart__container'>
              {isLoading ? (
                <div className='chart__skeleton'>
                  <div className='chaotic-orbit chaotic-orbit--black loader'></div>
                </div>
              ) : (
                <Doughnut data={data} />
              )}
            </div>
            <form onSubmit={(e) => handleColorSubmit(e)}>
              <p>Red</p>
              <input
                type='text'
                value={redValue}
                onChange={(e) => handleColorChange(e, 'red')}
              />
              <p>Blue</p>
              <input
                type='text'
                value={blueValue}
                onChange={(e) => handleColorChange(e, 'blue')}
              />
              <p>Green</p>
              <input
                type='text'
                value={greenValue}
                onChange={(e) => handleColorChange(e, 'green')}
              />
              <p>Yellow</p>
              <input
                type='text'
                value={yellowValue}
                onChange={(e) => handleColorChange(e, 'yellow')}
              />
              <button>Change Values</button>
            </form>
          </div>
        </div>
      </main>
    </>
  );
};
