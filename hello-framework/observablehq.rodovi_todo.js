export const todoPages = [
  
      {
    name: "Župe",
      pages: [          
      { name: "Župe (R)",             path: /pages/ROD/Zupe_D?ROD=${encodeURIComponent(CURRENT_PROJECT)} },
      { name: "Župe Rodos. (R)",      path: /pages/ROD/Zupe_rodoslovlje_R?ROD=${encodeURIComponent(CURRENT_PROJECT)} },
      { name: "Župe Obitelji (R)",    path: /pages/ROD/Zupe_obitelji_R?ROD=${encodeURIComponent(CURRENT_PROJECT)} },
      { name: "Župe (E)",       path: /pages/ENTITET/Zupe_E?ROD=${encodeURIComponent(CURRENT_PROJECT)} },
     ]

  },
      {
    name: "Države",
      pages: [         
      { name: "Države (E)",     path: /pages/ENTITET/Drzava_E?ROD=${encodeURIComponent(CURRENT_PROJECT)} },  

  
    ]
  },
      {
    name: "Migracije",
      pages: [    
      { name: "Migracije (R)",        path: /pages/ROD/Migracije_R?ROD=${encodeURIComponent(CURRENT_PROJECT)} },  
      { name: "Mig. Ind. (E)",  path: /pages/ENTITET/Migracije_Individualne_E?ROD=${encodeURIComponent(CURRENT_PROJECT)} },
      { name: "Masovne (E)",    path: /pages/ENTITET/Migracije_Masovne_E?ROD=${encodeURIComponent(CURRENT_PROJECT)} },
    ]
  },
  
    {
    name: "Bolesti",
      pages: [        
      { name: "Bolesti (E)",    path: /pages/ENTITET/Bolesti_E?ROD=${encodeURIComponent(CURRENT_PROJECT)} },
         ]
  },  
    {
    name: "Groblje",
      pages: [    
        { name: "Groblje (E)",    path: /pages/ENTITET/Groblje_E?ROD=${encodeURIComponent(CURRENT_PROJECT)} },        
    ]
  },
    {
    name: "Katastar",
      pages: [ 
     
      { name: "Katastar (E)", path: "/pages/ENTITET/Katastar_E" },
    ]
  },  
    {
    name: "Zapisi",
      pages: [ 
      { name: "Zapisi (R)",           path: /pages/ROD/Zapisi_R?ROD=${encodeURIComponent(CURRENT_PROJECT)} },          
      { name: "Zapisi (E)",     path: /pages/ENTITET/Zapisi_E?ROD=${encodeURIComponent(CURRENT_PROJECT)} },
    ]
  }, 
  

  {
    name: "Pismo",
    pages: [
      { name: "Pismo (E)",      path: /pages/ENTITET/Pismo_E?ROD=${encodeURIComponent(CURRENT_PROJECT)} },
    ]
  },
  {
    name: "Izvori",
    pages: [
      { name: "Prezime (E)", path: "/pages/1_Jularic/01.3.prezime_e" },
      { name: "Izvori (E)",           path: "/pages/ENTITET/Izvori_E" },
      { name: "Izvori* (E)",          path: /pages/ENTITET/Popisi_E?ROD=${encodeURIComponent(CURRENT_PROJECT)} },      
      { name: "Kuće (E)",       path: /pages/ENTITET/Kucedomacin_E?ROD=${encodeURIComponent(CURRENT_PROJECT)} },
    ]
  },
  ...obiteljiPoMjestuPages,
];
