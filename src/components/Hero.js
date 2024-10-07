import { Box, Flex, Heading, Image } from '@chakra-ui/react';
import heroImg from '../assets/images/hero.jpg';
export default function Hero() {
  return (
    <>
      <Flex
        justify={'center'}
        mt={['20px', '40px']}
        px={['10px', '40px']}
        flexDirection={['column', 'row']}
      >
        <Box>
          <Image
            src={heroImg}
            borderRadius={'50'}
            height={['50px', '450px']}
            width={['50px', '450px']}
            objectFit={'cover'}
          />
        </Box>
      </Flex>
      <Flex
        justify={'center'}
        mt={['10px', '20px', '30px']}
        textAlign={'center'}
      >
        <Box>
          <Heading fontSize={['sm', '4xl']}>
            Share Your Thoughts. Inspire the World...!
          </Heading>
        </Box>
      </Flex>
    </>
  );
}
