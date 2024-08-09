export default function ListItems({ list =  [ "Your full name and section",
    "Links to each of the lab assignments",
   "Link to the Kanbas application",
   "Links to all relevant source code repositories"
]}) {
    const items = list.map((item, index) => 
      <li key={index}>{item}</li>
    );

    return <>{items}</>;
}