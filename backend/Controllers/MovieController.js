import SeatLayoutModel from '../Models/SeatLayout.js'

const SeatLayout = async (req, res) => {
    try {
        const layout = await SeatLayoutModel.findOne({ layoutName: 'basic' }); // Tìm layout có tên 'basic'

        if (!layout) {
            return res.status(404).send('Layout not found');
        }

        // Render dữ liệu qua EJS hoặc trả về JSON
        return res.send(layout);  // 'layout' là tên file EJS (view)
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
}
export {
    SeatLayout
}