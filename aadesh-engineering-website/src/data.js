const img = (f) => `/images/${f}`
export const company = {
  name: 'Aadesh Engineering',
  phone: '9850166387',
  email: 'aadeshengineering@yahoo.com',
  md: 'Mr. Mahesh Jondhale',
  address: 'Gat No. 78, Shivshankar Industrial Estate, Jyotibanagar, Talawade, Pune, Maharashtra 411062',
}





export const products = [
  { group: 'Oil pump shafts', items: ['p28', 'p30', 'p31', 'p33'] },
  { group: 'Gears', items: ['p29', 'p32'] },
  { group: 'Tensioner nuts and sleeves', items: ['p34', 'p35', 'p36', 'p37'] },
  { group: 'Pins, spacers and adapters', items: ['p23', 'p24', 'p25', 'p26', 'p27'] },
].map((g) => ({ ...g, items: g.items.map((i) => img(`${i}.jpg`)) }))
export const machines = [
  { name: 'XL Jobber CNC', img: img('m-xl-jobber.jpg'), spec: ['Standard turning diameter 165 mm, maximum 200 mm', 'Between centres 300 mm, 8-station turret', 'Fanuc control, model year 2012'] },
  { name: 'LMW CNC', img: img('m-lmw.jpg'), spec: ['Standard turning diameter 165 mm, maximum 200 mm', 'Between centres 300 mm, 8-station turret', 'Fanuc control, model year 2018'] },
  { name: 'Jyoti PX10 VMC', img: img('m-vmc.jpg'), spec: ['Travel X 510, Y 410, Z 510 mm', 'Table 660 x 360 mm, spindle up to 6000 rpm', '20 tools, Fanuc control, model year 2018'] },
  { name: 'Milling (Samson)', img: img('m-milling.jpg'), spec: ['12 milling machines on the shop floor'] },
  { name: 'Traub (PMT)', img: img('m-traub.jpg'), spec: ['35 Traub machines for high volume turned parts'] },
]
export const machineList = [['CNC', 9], ['Milling', 12], ['Traub', 35], ['Centreless grinding', 3], ['Cylindrical grinding', 2], ['Bench grinding', 3], ['VMC', 1], ['Drilling / tapping', 4]]
export const inspection = [
  ['Digital height gauge', 'p38.jpg'], ['Surface roughness tester', 'p39.jpg'], ['Hardness tester', 'p40.png'], ['Profile projector', 'p41.jpg'],
].map(([n, f]) => ({ name: n, img: img(f) }))
export const clients = ['c15.jpg', 'c16.png', 'c17.png', 'c18.jpg', 'c19.png', 'c20.png', 'c21.png', 'c22.png'].map(img)
export const manpower = [['Management staff', 12], ['Operators', 70], ['Inspectors', 9], ['Helpers', 12]]
export const awards = [['Advik Best Initiative in DISHA', '2016'], ['Advik Best Kaizen, 1st runner up', '2017-18'], ['Advik Best Kaizen Award', '2018-19']]
export const awardImgs = ['p42.jpg', 'p43.jpg', 'p44.jpg'].map(img)
export const reasons = [
  { title: 'Uncompromising Quality', text: 'Every single component undergoes rigorous inspection before leaving our facility to ensure zero-defect delivery.' },
  { title: 'On-Time Delivery', text: 'With streamlined, meticulous production planning, we guarantee your components arrive exactly when promised.' },
  { title: 'Sustainable & Safe Operations', text: '• We operate a state-of-the-art, safe, and clean plant that strictly adheres to international safety and environmental standards.' },
]
export const heroSlides = ['plant.jpg', 'm-cnc.jpg', 'm-vmc.jpg', 'm-xl-jobber.jpg'].map(img)
export const plantGallery = [
  ['plant.jpg', 'Shop floor'], ['m-cnc.jpg', 'CNC turning'], ['m-vmc.jpg', 'Jyoti PX10 VMC'],
  ['m-lmw.jpg', 'LMW CNC'], ['m-xl-jobber.jpg', 'XL Jobber CNC'], ['m-traub.jpg', 'Traub machines'],
].map(([f, label]) => ({ src: img(f), label }))
export const leaders = [
  { name: company.md, role: 'Managing Director', phone: company.phone, email: company.email },
]