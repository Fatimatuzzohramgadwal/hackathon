import DashboardLayout from "@/components/DashboardLayout";
import AnimatedPage from "@/components/AnimatedPage";
import ChatBot from "@/components/ChatBot";
import { Brain } from "lucide-react";

const AiChat = () => {
  return (
    <DashboardLayout role="student">
      <AnimatedPage>
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <Brain className="h-6 w-6 text-primary" />
            <div>
              <h1 className="text-2xl font-bold text-foreground">AI Chat Assistant 🤖</h1>
              <p className="mt-1 text-sm text-muted-foreground">
                Get instant help with placement guidance, interview tips, and career advice.
              </p>
            </div>
          </div>

          {/* Chat Interface */}
          <div className="h-[calc(100vh-200px)]">
            <ChatBot fullPage={true} />
          </div>
        </div>
      </AnimatedPage>
    </DashboardLayout>
  );
};

export default AiChat;
