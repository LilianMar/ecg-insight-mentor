import { Heart, Upload, Brain, BarChart3, BookOpen, Target } from "lucide-react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import logoTrainECG from "@/assets/logoTrainECG.png";

const Dashboard = () => {
  const features = [
    {
      title: "Clasificar ECG",
      description: "Sube una imagen de ECG para análisis automático con IA",
      icon: Upload,
      path: "/classify",
      gradient: "bg-gradient-medical",
    },
    {
      title: "Modo Práctica",
      description: "Practica con casos reales y recibe retroalimentación",
      icon: Brain,
      path: "/practice",
      gradient: "bg-gradient-medical",
    },
    {
      title: "Test Inicial",
      description: "Evalúa tu nivel actual de conocimientos",
      icon: Target,
      path: "/test",
      gradient: "bg-gradient-medical",
    },
    {
      title: "Mi Progreso",
      description: "Visualiza tu evolución y estadísticas",
      icon: BarChart3,
      path: "/progress",
      gradient: "bg-gradient-medical",
    },
    {
      title: "Biblioteca ECG",
      description: "Accede a casos de estudio y referencias",
      icon: BookOpen,
      path: "/library",
      gradient: "bg-gradient-medical",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-gradient-to-r from-card to-secondary/30 border-b border-border/50 backdrop-blur-sm">
        <div className="container mx-auto px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-teal p-2">
                <img src={logoTrainECG} alt="TrainECG Logo" className="w-full h-full object-contain" />
              </div>
              <h1 className="text-3xl font-bold text-foreground">TrainECG</h1>
            </div>
            <nav className="flex items-center space-x-6">
              <Link to="/profile" className="text-muted-foreground hover:text-primary transition-colors">
                Perfil
              </Link>
              <button className="text-muted-foreground hover:text-primary transition-colors">
                Cerrar Sesión
              </button>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-8 py-10 max-w-7xl">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-2">
            Bienvenido a TrainECG
          </h2>
          <p className="text-lg text-muted-foreground">
            Mejora tus habilidades en interpretación de electrocardiogramas con IA avanzada
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12 px-4">
          {features.map((feature, index) => (
            <Link key={index} to={feature.path}>
              <Card className="medical-card-feature group">
                <CardContent className="p-6">
                  <div className={`w-14 h-14 ${feature.gradient} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-teal`}>
                    <feature.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
          <Card className="medical-card">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-primary mb-2">24</div>
              <p className="text-muted-foreground">ECGs Analizados</p>
            </CardContent>
          </Card>
          
          <Card className="medical-card">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-success mb-2">87%</div>
              <p className="text-muted-foreground">Precisión Promedio</p>
            </CardContent>
          </Card>
          
          <Card className="medical-card">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-warning mb-2">12</div>
              <p className="text-muted-foreground">Días de Racha</p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;