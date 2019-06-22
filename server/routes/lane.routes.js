import { Router } from 'express';
import * as LaneController from '../controllers/lane.controller';

const router = new Router();

// Get all Lanes
/* Example response
{
    "lanes": [
        {
            "_id": "5d029be7dbcef0294cc2465e",
            "id": "21ddc5ae-367f-4e47-961c-60519f127fc7",
            "name": "test",
            "__v": 6,
            "notes": [
                {
                    "_id": "5d034f19c8ca961b18e2b067",
                    "id": "078723af-b7d9-4060-927f-29d776be9a38",
                    "task": "test",
                    "__v": 0
                },
            ]
        },
        {
            "_id": "5d0358b8a7de782df81f60f9",
            "id": "e241e81d-eee6-4d16-9b6e-415779b168ab",
            "name": "test",
            "__v": 0,
            "notes": []
        }
    ]
}
*/
router.route('/lanes').get(LaneController.getLanes);

// Add new Lane
/* Example query bodu format - required
{
    "name": "test"
}

Exapmle response:
{
    "__v": 0,
    "id": "0b677eb6-bb5c-4cb4-a133-bd84fb06d497",
    "name": "test",
    "_id": "5d035a05b4ec8f1228a50fec",
    "notes": []
}
*/
router.route('/lanes').post(LaneController.addLane);

// Delete a lane by laneId
// Query format: localhost:3000/lanes/<lane ID>
// Example query localhost:3000/api/lanes/71e17015-e339-423d-bef2-36852bc69d77
router.route('/lanes/:laneId').delete(LaneController.deleteLane);

// Rename a lane by LaneId
// Query format: localhost:3000/lanes/<lane ID>
// Example query localhost:3000/api/lanes/71e17015-e339-423d-bef2-36852bc69d77
/* Example request body - required:
{
    "name": "new name"
}

Example response:
{
    "_id": "5d029be7dbcef0294cc2465e",
    "id": "21ddc5ae-367f-4e47-961c-60519f127fc7",
    "name": "new name",
    "__v": 6,
    "notes": [
        "5d029c05dbcef0294cc2465f",
        "5d029c06dbcef0294cc24661",
        "5d034f19c8ca961b18e2b067",
        "5d034f1bc8ca961b18e2b068",
        "5d034f1dc8ca961b18e2b069"
    ]
}
*/
router.route('/lanes/:laneId').put(LaneController.renameLane);

// Move note
// Query format: localhost:3000/lanes/moveNote
/* Example request body - required. 
It is array with objects. Important: notes array has to contain ObjectIds of notes.
[
  {
    _id: '5d0e113be51d041f64776f59',
    id: '1dfa2671-0d99-40fd-9ed3-9587424ae857',
    name: 'New Lane',
    __v: 4,
    notes: [
      '5d0e113de51d041f64776f5c',
      '5d0e113fe51d041f64776f61',
      '5d0e113ee51d041f64776f5e',
    ],
  },
  {
    _id: '5d0e113be51d041f64776f5a',
    id: '7afda62a-b6f2-4c77-95c7-c8142c629567',
    name: 'New Lane',
    __v: 2,
    notes: [
      '5d0e113ee51d041f64776f5d',
      '5d0e113ee51d041f64776f5f',
      '5d0e113fe51d041f64776f60',
    ],
  },
  {
    _id: '5d0e113ce51d041f64776f5b',
    id: 'aa829615-5884-4ab5-b8cb-8635848ad02b',
    name: 'New Lane',
    __v: 1,
    notes: ['5d0e1140e51d041f64776f62'],
  },
];
*/
router.route('/lanes/moveNote').patch(LaneController.moveNote);

export default router;
