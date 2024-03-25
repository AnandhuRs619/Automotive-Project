import { Box, Text } from '@chakra-ui/react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

export const GraphComponent = () => {
  // Define your chart data
  const data = {
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    datasets: [
      {
        label: '# of Votes',
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: ['red', 'blue', 'yellow', 'green', 'purple', 'orange'],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <Box bgGradient="linear(to-r, white, gray.200)" p="4" borderRadius="lg" m={"5"} boxShadow="md"width="350px">
      <Text fontSize="xl" color={"black"} fontWeight="bold" mb="4">Graph Title</Text>
      <Box width="100%" maxW="500px" mx="auto">
        {/* Render the Doughnut chart component */}
        <Doughnut data={data} />
      </Box>
    </Box>
  );
};
