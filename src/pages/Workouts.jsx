import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DatePickerDemo } from "@/components/ui/date-picker";

const workoutSchema = z.object({
  exerciseName: z.string().min(1, "Exercise name is required"),
  sets: z.number().min(1, "Sets must be at least 1"),
  reps: z.number().min(1, "Reps must be at least 1"),
  weight: z.number().min(0, "Weight must be at least 0"),
  date: z.date(),
});

const Workouts = () => {
  const [workouts, setWorkouts] = useState([]);
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: zodResolver(workoutSchema),
  });

  const onSubmit = (data) => {
    setWorkouts([...workouts, data]);
    reset();
  };

  return (
    <div className="p-4">
      <Card>
        <CardHeader>
          <CardTitle>Log Workout</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <Label htmlFor="exerciseName">Exercise Name</Label>
              <Input id="exerciseName" {...register("exerciseName")} />
              {errors.exerciseName && <p className="text-red-500">{errors.exerciseName.message}</p>}
            </div>
            <div>
              <Label htmlFor="sets">Sets</Label>
              <Input id="sets" type="number" {...register("sets", { valueAsNumber: true })} />
              {errors.sets && <p className="text-red-500">{errors.sets.message}</p>}
            </div>
            <div>
              <Label htmlFor="reps">Reps</Label>
              <Input id="reps" type="number" {...register("reps", { valueAsNumber: true })} />
              {errors.reps && <p className="text-red-500">{errors.reps.message}</p>}
            </div>
            <div>
              <Label htmlFor="weight">Weight (kg)</Label>
              <Input id="weight" type="number" {...register("weight", { valueAsNumber: true })} />
              {errors.weight && <p className="text-red-500">{errors.weight.message}</p>}
            </div>
            <div>
              <Label htmlFor="date">Date</Label>
              <DatePickerDemo {...register("date")} />
              {errors.date && <p className="text-red-500">{errors.date.message}</p>}
            </div>
            <Button type="submit">Log Workout</Button>
          </form>
        </CardContent>
      </Card>

      <div className="mt-8">
        <h2 className="text-2xl mb-4">Logged Workouts</h2>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Exercise Name</TableHead>
              <TableHead>Sets</TableHead>
              <TableHead>Reps</TableHead>
              <TableHead>Weight (kg)</TableHead>
              <TableHead>Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {workouts.map((workout, index) => (
              <TableRow key={index}>
                <TableCell>{workout.exerciseName}</TableCell>
                <TableCell>{workout.sets}</TableCell>
                <TableCell>{workout.reps}</TableCell>
                <TableCell>{workout.weight}</TableCell>
                <TableCell>{workout.date.toLocaleDateString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Workouts;