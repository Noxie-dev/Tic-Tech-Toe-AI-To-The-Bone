import React from 'react';
import { Card, CardHeader, CardContent, CardFooter, CardTitle } from './ui/card';
import { Button } from './ui/button';

const TestCardComponent: React.FC = () => {
  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Test Card Component</CardTitle>
      </CardHeader>
      <CardContent>
        <p>This is a test card to see if Shadcn UI components are working correctly.</p>
      </CardContent>
      <CardFooter>
        <Button>Test Button</Button>
      </CardFooter>
    </Card>
  );
};

export default TestCardComponent;
