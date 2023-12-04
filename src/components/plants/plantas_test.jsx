export const PLANTAS = [
  {
    name: 'Aloe Vera',
    description: 'planta medicinal',
    plant_public: true,
    irrigation_type: 'muypoca',
    light_type: 'poca',
    location: 'balcón',
    notes: 'string',
    image: 'string',
    id: 1,
    owner_id: 1,
    category_id: 1,
    created_at: '2023-11-14T03:01:19',
    journals: [
      {
        title: 'Transplante en noviembre',
        description: 'transplantada a maceta de 20l',
        image: 'string',
        id: 1,
        plant_id: 1,
        created_at: '2023-11-14T03:05:02',
      },
      {
        title: 'Poda 2023',
        description: 'Retiradas hojas muertas',
        image: 'string',
        id: 2,
        plant_id: 1,
        created_at: '2023-11-14T03:05:23',
      },
    ],
    alerts: [
      {
        notes: 'riego1',
        start_date: '2023-11-10T00:04:45',
        status: true,
        repeat: true,
        frecuency: 3,
        id: 1,
        created_at: '2023-11-14T03:06:32',
        plant_id: 1,
        alert_type_id: 1,
      },
      {
        notes: 'riego2',
        start_date: '2023-11-10T00:04:45',
        status: true,
        repeat: true,
        frecuency: 5,
        id: 2,
        created_at: '2023-11-14T03:06:48',
        plant_id: 1,
        alert_type_id: 1,
      },
      {
        notes: 'riego3',
        start_date: '2023-11-10T00:04:45',
        status: true,
        repeat: true,
        frecuency: 10,
        id: 3,
        created_at: '2023-11-14T03:07:01',
        plant_id: 1,
        alert_type_id: 1,
      },
    ],
  },
  {
    name: 'Ficus',
    description: 'planta muy longeva y agradecida',
    plant_public: true,
    irrigation_type: 'bastante',
    light_type: 'poca',
    location: 'interior',
    notes: 'string',
    image: 'string',
    id: 2,
    owner_id: 1,
    category_id: 1,
    created_at: '2023-11-14T03:03:18',
    journals: [],
    alerts: [],
  },
  {
    name: 'Albahaca',
    description: 'Especia para salsas y aderezos',
    plant_public: true,
    irrigation_type: 'bastante',
    light_type: 'poca',
    location: 'interior',
    notes: 'string',
    image: 'string',
    id: 3,
    owner_id: 1,
    category_id: 1,
    created_at: '2023-11-14T03:03:44',
    journals: [],
    alerts: [],
  },
];
