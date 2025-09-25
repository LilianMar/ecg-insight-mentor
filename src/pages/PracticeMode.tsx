import { useState } from "react";
import { ArrowLeft, Brain, CheckCircle, XCircle, RotateCcw, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";

const PracticeMode = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState(0);
  const { toast } = useToast();

  const questions = [
    {
      id: 1,
      ecgImage: "/api/placeholder/600/300",
      question: "¿Qué tipo de arritmia observas en este ECG?",
      options: [
        "Ritmo sinusal normal",
        "Fibrilación auricular",
        "Taquicardia ventricular",
        "Bloqueo AV de primer grado"
      ],
      correctAnswer: 1,
      explanation: "Se observan ondas P irregulares y ausencia de patrón sinusal normal, característico de fibrilación auricular. La respuesta ventricular es irregular.",
      clinicalContext: "La fibrilación auricular es la arritmia más común en adultos mayores y requiere anticoagulación en pacientes con factores de riesgo."
    },
    {
      id: 2,
      ecgImage: "/api/placeholder/600/300",
      question: "¿Cuál es la frecuencia cardíaca aproximada en este ECG?",
      options: [
        "60-80 lpm",
        "80-100 lpm",
        "100-120 lpm",
        "Mayor a 120 lpm"
      ],
      correctAnswer: 2,
      explanation: "Contando los complejos QRS en 6 segundos y multiplicando por 10, la frecuencia cardíaca es aproximadamente 110 lpm.",
      clinicalContext: "Una frecuencia cardíaca entre 100-120 lpm se considera taquicardia leve y puede requerir investigación de causas subyacentes."
    },
    {
      id: 3,
      ecgImage: "/api/placeholder/600/300",
      question: "¿Qué intervalo está prolongado en este ECG?",
      options: [
        "Intervalo PR",
        "Intervalo QT",
        "Intervalo QRS",
        "Ninguno está prolongado"
      ],
      correctAnswer: 1,
      explanation: "El intervalo QT está prolongado (>440ms en hombres, >460ms en mujeres), lo que aumenta el riesgo de arritmias ventriculares.",
      clinicalContext: "La prolongación del QT puede ser congénita o adquirida (medicamentos, electrolitos) y predispone a torsades de pointes."
    }
  ];

  const currentQ = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  const handleAnswerSelect = (answerIndex: number) => {
    if (showFeedback) return;
    setSelectedAnswer(answerIndex);
  };

  const handleSubmitAnswer = () => {
    if (selectedAnswer === null) {
      toast({
        title: "Selecciona una respuesta",
        description: "Por favor, elige una opción antes de continuar.",
        variant: "destructive",
      });
      return;
    }

    setShowFeedback(true);
    
    if (selectedAnswer === currentQ.correctAnswer) {
      setScore(score + 1);
      toast({
        title: "¡Correcto! 🎉",
        description: "Excelente diagnóstico.",
      });
    } else {
      toast({
        title: "Respuesta incorrecta",
        description: "Revisa la explicación para aprender.",
        variant: "destructive",
      });
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowFeedback(false);
    } else {
      toast({
        title: "¡Práctica completada!",
        description: `Puntuación final: ${score + (selectedAnswer === currentQ.correctAnswer ? 1 : 0)}/${questions.length}`,
      });
    }
  };

  const resetPractice = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowFeedback(false);
    setScore(0);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-gradient-hero relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-black/10 to-transparent" />
        <div className="relative z-10 container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link to="/dashboard">
                <Button variant="outline" size="sm" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Volver
                </Button>
              </Link>
              <h1 className="text-2xl font-bold text-white">Modo Práctica</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-white/90">
                Pregunta {currentQuestion + 1} de {questions.length}
              </span>
              <Button variant="outline" size="sm" onClick={resetPractice} className="bg-white/10 border-white/20 text-white hover:bg-white/20">
                <RotateCcw className="w-4 h-4 mr-2" />
                Reiniciar
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        {/* Progress Bar */}
        <Card className="medical-card mb-6">
          <CardContent className="p-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium">Progreso</span>
              <span className="text-sm text-muted-foreground">
                Puntuación: {score}/{questions.length}
              </span>
            </div>
            <Progress value={progress} className="w-full" />
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* ECG Display */}
          <div className="space-y-6">
            <Card className="medical-card">
              <CardHeader>
                <CardTitle>ECG para Análisis</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-secondary rounded-lg p-4 ecg-grid min-h-[300px] flex items-center justify-center">
                  <div className="text-center">
                    <Brain className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">
                      Imagen de ECG #{currentQ.id}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Feedback Section */}
            {showFeedback && (
              <Card className={`medical-card ${selectedAnswer === currentQ.correctAnswer ? 'border-success/20 bg-success/5' : 'border-destructive/20 bg-destructive/5'}`}>
                <CardHeader>
                  <CardTitle className={`flex items-center ${selectedAnswer === currentQ.correctAnswer ? 'text-success' : 'text-destructive'}`}>
                    {selectedAnswer === currentQ.correctAnswer ? (
                      <CheckCircle className="w-5 h-5 mr-2" />
                    ) : (
                      <XCircle className="w-5 h-5 mr-2" />
                    )}
                    {selectedAnswer === currentQ.correctAnswer ? "¡Correcto!" : "Incorrecto"}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Explicación:</h4>
                    <p className="text-sm text-muted-foreground">
                      {currentQ.explanation}
                    </p>
                  </div>
                  
                  <div className="p-4 bg-secondary rounded-lg">
                    <h4 className="font-medium mb-2">Contexto Clínico:</h4>
                    <p className="text-sm text-muted-foreground">
                      {currentQ.clinicalContext}
                    </p>
                  </div>

                  {currentQuestion < questions.length - 1 ? (
                    <Button onClick={handleNextQuestion} className="btn-medical w-full">
                      <ArrowRight className="w-4 h-4 mr-2" />
                      Siguiente Pregunta
                    </Button>
                  ) : (
                    <div className="space-y-3">
                      <div className="text-center p-4 bg-primary/10 rounded-lg">
                        <h3 className="font-bold text-lg text-primary mb-2">¡Práctica Completada!</h3>
                        <p className="text-muted-foreground">
                          Puntuación final: {score + (selectedAnswer === currentQ.correctAnswer ? 1 : 0)}/{questions.length} 
                          ({Math.round(((score + (selectedAnswer === currentQ.correctAnswer ? 1 : 0)) / questions.length) * 100)}%)
                        </p>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <Button onClick={resetPractice} variant="outline" className="w-full">
                          <RotateCcw className="w-4 h-4 mr-2" />
                          Practicar de Nuevo
                        </Button>
                        <Link to="/dashboard" className="w-full">
                          <Button className="btn-medical w-full">
                            Ir al Dashboard
                          </Button>
                        </Link>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
          </div>

          {/* Question and Options */}
          <div className="space-y-6">
            <Card className="medical-card">
              <CardHeader>
                <CardTitle>{currentQ.question}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {currentQ.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswerSelect(index)}
                    disabled={showFeedback}
                    className={`w-full p-4 text-left border rounded-lg transition-all ${
                      selectedAnswer === index
                        ? showFeedback
                          ? index === currentQ.correctAnswer
                            ? "border-success bg-success/10 text-success"
                            : "border-destructive bg-destructive/10 text-destructive"
                          : "border-primary bg-primary/10 text-primary"
                        : showFeedback && index === currentQ.correctAnswer
                        ? "border-success bg-success/10 text-success"
                        : "border-border hover:border-primary/50 hover:bg-primary/5"
                    }`}
                  >
                    <div className="flex items-center">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full border border-current flex items-center justify-center mr-3 text-xs font-medium">
                        {String.fromCharCode(65 + index)}
                      </span>
                      <span>{option}</span>
                    </div>
                  </button>
                ))}

                {!showFeedback && (
                  <Button 
                    onClick={handleSubmitAnswer} 
                    className="btn-medical w-full mt-6"
                    disabled={selectedAnswer === null}
                  >
                    Enviar Respuesta
                  </Button>
                )}
              </CardContent>
            </Card>

            {/* Learning Tips */}
            <Card className="medical-card">
              <CardHeader>
                <CardTitle className="text-sm">💡 Consejo de Aprendizaje</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Observa cuidadosamente el ritmo, la frecuencia y la morfología de las ondas. 
                  Recuerda que la práctica regular mejora significativamente la precisión diagnóstica.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PracticeMode;