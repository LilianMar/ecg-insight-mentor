import { ArrowLeft, TrendingUp, Target, Calendar, Award } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress as ProgressBar } from "@/components/ui/progress";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from "recharts";

const Progress = () => {
  // Sample data for charts
  const performanceData = [
    { date: "Sem 1", accuracy: 65, cases: 8 },
    { date: "Sem 2", accuracy: 72, cases: 12 },
    { date: "Sem 3", accuracy: 78, cases: 15 },
    { date: "Sem 4", accuracy: 85, cases: 18 },
    { date: "Sem 5", accuracy: 87, cases: 24 },
    { date: "Sem 6", accuracy: 91, cases: 28 },
  ];

  const arrhythmiaStats = [
    { name: "Fibrilación Auricular", correct: 12, total: 15, accuracy: 80 },
    { name: "Taquicardia Ventricular", correct: 8, total: 10, accuracy: 80 },
    { name: "Bloqueo AV", correct: 6, total: 9, accuracy: 67 },
    { name: "Flutter Auricular", correct: 4, total: 6, accuracy: 67 },
    { name: "Ritmo Sinusal Normal", correct: 18, total: 20, accuracy: 90 },
  ];

  const pieData = [
    { name: "Correcto", value: 87, color: "hsl(var(--success))" },
    { name: "Incorrecto", value: 13, color: "hsl(var(--destructive))" },
  ];

  const achievements = [
    { title: "Primera Clasificación", description: "Completaste tu primer análisis de ECG", earned: true },
    { title: "Racha de 7 días", description: "Practica durante 7 días consecutivos", earned: true },
    { title: "Maestro de FA", description: "90% de precisión en fibrilación auricular", earned: true },
    { title: "Analista Experto", description: "100 ECGs analizados correctamente", earned: false },
    { title: "Perfeccionista", description: "10 respuestas perfectas consecutivas", earned: false },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center space-x-4">
            <Link to="/dashboard">
              <Button variant="outline" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Volver
              </Button>
            </Link>
            <h1 className="text-2xl font-bold text-foreground">Mi Progreso</h1>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="medical-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Precisión Total</p>
                  <p className="text-2xl font-bold text-success">87%</p>
                </div>
                <TrendingUp className="w-8 h-8 text-success" />
              </div>
            </CardContent>
          </Card>

          <Card className="medical-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">ECGs Analizados</p>
                  <p className="text-2xl font-bold text-primary">124</p>
                </div>
                <Target className="w-8 h-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card className="medical-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Días de Racha</p>
                  <p className="text-2xl font-bold text-warning">12</p>
                </div>
                <Calendar className="w-8 h-8 text-warning" />
              </div>
            </CardContent>
          </Card>

          <Card className="medical-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Logros</p>
                  <p className="text-2xl font-bold text-foreground">3/5</p>
                </div>
                <Award className="w-8 h-8 text-foreground" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Performance Chart */}
          <Card className="medical-card">
            <CardHeader>
              <CardTitle>Evolución de Precisión</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={performanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis domain={[0, 100]} />
                  <Tooltip 
                    formatter={(value, name) => [`${value}%`, "Precisión"]}
                    labelFormatter={(label) => `Semana: ${label}`}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="accuracy" 
                    stroke="hsl(var(--primary))" 
                    strokeWidth={3}
                    dot={{ fill: "hsl(var(--primary))", strokeWidth: 2, r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Accuracy Distribution */}
          <Card className="medical-card">
            <CardHeader>
              <CardTitle>Distribución de Respuestas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-center mb-6">
                <ResponsiveContainer width={200} height={200}>
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={90}
                      dataKey="value"
                      startAngle={90}
                      endAngle={450}
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [`${value}%`, "Porcentaje"]} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Respuestas Correctas</span>
                  <span className="font-medium text-success">87%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Respuestas Incorrectas</span>
                  <span className="font-medium text-destructive">13%</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Arrhythmia Performance */}
          <Card className="medical-card">
            <CardHeader>
              <CardTitle>Rendimiento por Tipo de Arritmia</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {arrhythmiaStats.map((stat, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">{stat.name}</span>
                      <span className="text-sm text-muted-foreground">
                        {stat.correct}/{stat.total} ({stat.accuracy}%)
                      </span>
                    </div>
                    <ProgressBar value={stat.accuracy} className="h-2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Achievements */}
          <Card className="medical-card">
            <CardHeader>
              <CardTitle>Logros</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {achievements.map((achievement, index) => (
                  <div key={index} className={`flex items-center space-x-3 p-3 rounded-lg border ${
                    achievement.earned 
                      ? "border-success/20 bg-success/10" 
                      : "border-border bg-muted/50"
                  }`}>
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      achievement.earned ? "bg-success text-white" : "bg-muted text-muted-foreground"
                    }`}>
                      <Award className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <h4 className={`font-medium ${achievement.earned ? "text-success" : "text-muted-foreground"}`}>
                        {achievement.title}
                      </h4>
                      <p className="text-xs text-muted-foreground">
                        {achievement.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Weekly Goal */}
        <Card className="medical-card mt-8">
          <CardHeader>
            <CardTitle>Meta Semanal</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium">Analizar 15 ECGs esta semana</span>
              <span className="text-sm text-muted-foreground">8/15 completados</span>
            </div>
            <ProgressBar value={53} className="mb-2" />
            <p className="text-xs text-muted-foreground">
              ¡Vas muy bien! Solo 7 ECGs más para completar tu meta semanal.
            </p>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Progress;