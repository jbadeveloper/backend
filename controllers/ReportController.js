import PDFDocument from 'pdfkit';
import { Op } from 'sequelize';
import Journal from '../models/Journal.js'; // Sesuaikan dengan model Anda
import Employee from '../models/Employee.js'; // Pastikan ada model Employee

export const generateReport = async (req, res) => {
    const { employeeID } = req.params;
    const { startDate, endDate } = req.query; // Ambil rentang tanggal dari query parameters

    try {
        // Validasi input tanggal
        if (!startDate || !endDate) {
            return res.status(400).json({ message: "Start date and end date are required." });
        }

        const start = new Date(startDate);
        const end = new Date(endDate);

        if (isNaN(start) || isNaN(end)) {
            return res.status(400).json({ message: "Invalid date format." });
        }

        if (start > end) {
            return res.status(400).json({ message: "Start date cannot be after end date." });
        }

        // Ambil detail karyawan
        const employee = await Employee.findByPk(employeeID);
        if (!employee) {
            return res.status(404).json({ message: "Employee not found" });
        }

        // Ambil data jurnal berdasarkan employeeID dan rentang tanggal
        const journals = await Journal.findAll({
            where: {
                employeeID,
                date: {
                    [Op.between]: [startDate, endDate]
                }
            }
        });

        if (!journals || journals.length === 0) {
            return res.status(404).json({ message: "No journals found in the specified date range." });
        }

        // Buat PDF
        const doc = new PDFDocument();
        let filename = `Report_${employeeID}_${startDate}_to_${endDate}.pdf`;
        filename = encodeURIComponent(filename);
        res.setHeader('Content-disposition', 'attachment; filename="' + filename + '"');
        res.setHeader('Content-type', 'application/pdf');

        doc.pipe(res);

        // Tambahkan informasi karyawan
        doc.fontSize(20).text('Journal Report', { align: 'center' });
        doc.moveDown();

        doc.fontSize(14).text(`Nama Karyawan: ${employee.name}`);
        doc.text(`Posisi: ${employee.position}`);
        doc.text(`Kantor: ${employee.office}`);
        doc.text(`Periode: ${new Date(startDate).toLocaleDateString()} - ${new Date(endDate).toLocaleDateString()}`);
        doc.moveDown();

        // Tambahkan tabel jurnal
        doc.fontSize(16).text('Daftar Jurnal', { underline: true });
        doc.moveDown();

        // Tambahkan header tabel
        doc.fontSize(12);
        const headerY = doc.y;
        doc.text('No', 50, headerY, { width: 50, align: 'left' });
        doc.text('Tanggal', 100, headerY, { width: 100, align: 'left' });
        doc.text('Deskripsi', 200, headerY, { width: 200, align: 'left' });
        doc.text('Evaluasi', 400, headerY, { width: 100, align: 'left' });
        doc.moveDown();

        // Tambahkan garis pemisah
        doc.moveTo(50, doc.y).lineTo(550, doc.y).stroke();
        doc.moveDown(0.5);

        // Tambahkan data jurnal
        journals.forEach((journal, index) => {
            const currentY = doc.y;
            doc.text(index + 1, 50, currentY, { width: 50, align: 'left' });
            doc.text(new Date(journal.date).toLocaleDateString(), 100, currentY, { width: 100, align: 'left' });
            doc.text(journal.description, 200, currentY, { width: 200, align: 'left' });
            doc.text(journal.evaluation, 400, currentY, { width: 100, align: 'left' });
            doc.moveDown();
        });

        doc.end();
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error generating report', error });
    }
};
