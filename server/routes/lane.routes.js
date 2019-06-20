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

router.route('/lanes/moveWithin').patch(LaneController.moveWithin);

export default router;
