import csv
import os

class CSVProcessor:
    """Class to process multiple CSV files and save the combined information."""

    def __init__(self, directory, output_file):
        """
        Initialize the CSVProcessor.

        Parameters:
            directory (str): Directory path containing the CSV files.
            output_file (str): Path to the output CSV file.
        """
        self.directory = directory
        self.output_file = output_file

    def process_csv_files(self):
        """
        Process multiple CSV files and save the combined information.

        The first file encountered sets the column names, and subsequent files
        skip writing the column names.

        Rows from all files are appended to the output CSV file.
        """
        first_file = True
        columns_written = False

        # Get all CSV files in the directory
        csv_files = [file for file in os.listdir(self.directory) if file.endswith('.csv')]

        with open(self.output_file, 'w', newline='') as output_csv:
            writer = csv.writer(output_csv)

            for file_name in csv_files:
                file_path = os.path.join(self.directory, file_name)

                with open(file_path, 'r') as csv_file:
                    reader = csv.reader(csv_file)
                    headers = next(reader)  # Read the column names

                    # Write column names only once
                    if first_file and not columns_written:
                        self._write_column_names(headers, writer)
                        columns_written = True
                        first_file = False

                    # Add information to the output
                    self._write_information(headers, reader, writer)

    def _write_column_names(self, column_names, csv_writer):
        """
        Write column names to the output CSV file.

        Parameters:
            column_names (list): List of column names.
            csv_writer: CSV writer object.
        """
        csv_writer.writerow(column_names)

    def _write_information(self, column_names, csv_reader, csv_writer):
        """
        Write information to the output CSV file.

        Parameters:
            column_names (list): List of column names.
            csv_reader: CSV reader object.
            csv_writer: CSV writer object.
        """
        for row in csv_reader:
            csv_writer.writerow(row)

if __name__ == "__main__":
    # Usage example
    directory_path = 'Data/'
    output_file_path = 'combined.csv'

    processor = CSVProcessor(directory_path, output_file_path)
    processor.process_csv_files()
